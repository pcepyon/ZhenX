-- ZhenX Database Schema Migration
-- Created: 2025-01-03
-- Description: Initial database schema for medical tourism package curation service

-- 1. Categories table (독립)
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    display_order INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(display_order);

-- 2. Concerns table (categories 참조)
CREATE TABLE concerns (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES categories(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    weight DECIMAL(3,2) DEFAULT 1.0,
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_concerns_category ON concerns(category_id);

-- 3. Treatments_base table (categories 참조)
CREATE TABLE treatments_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name_ko VARCHAR(200) NOT NULL,
    name_cn VARCHAR(200) NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id),
    base_price INTEGER NOT NULL, -- VAT 별도 가격
    discount_price INTEGER, -- 할인가 (있는 경우)
    vat_rate DECIMAL(3,2) DEFAULT 0.10,
    duration_minutes INTEGER DEFAULT 30,
    recovery_days INTEGER DEFAULT 0,
    brand VARCHAR(50), -- '국산', '코어톡스', '제오민', '엘러간' 등
    unit VARCHAR(50), -- '샷', 'cc', '회' 등
    quantity INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_treatments_category ON treatments_base(category_id);
CREATE INDEX idx_treatments_code ON treatments_base(code);
CREATE INDEX idx_treatments_active ON treatments_base(is_active);

-- 4. Packages table (categories 참조)
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_code VARCHAR(50) UNIQUE NOT NULL,
    name_ko VARCHAR(200) NOT NULL,
    name_cn VARCHAR(200) NOT NULL,
    description_ko TEXT,
    description_cn TEXT,
    category_id VARCHAR(50) REFERENCES categories(id),
    concern_tags TEXT[], -- ['cheek_jaw_sagging', 'double_chin']
    price_tier VARCHAR(20) NOT NULL, -- 'basic', 'premium', 'luxury', 'ultra'
    discount_rate DECIMAL(3,2) DEFAULT 0.10,
    duration_minutes INTEGER,
    highlight_benefits JSONB, -- {"ko": [...], "cn": [...]}
    final_price INTEGER NOT NULL, -- VAT 포함 최종가
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_packages_category ON packages(category_id);
CREATE INDEX idx_packages_tier ON packages(price_tier);
CREATE INDEX idx_packages_concerns ON packages USING GIN(concern_tags);
CREATE INDEX idx_packages_active ON packages(is_active);

-- 5. Package_items table (packages, treatments_base 참조)
CREATE TABLE package_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
    treatment_id UUID REFERENCES treatments_base(id),
    quantity INTEGER DEFAULT 1,
    is_optional BOOLEAN DEFAULT false,
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_package_items_package ON package_items(package_id);
CREATE INDEX idx_package_items_treatment ON package_items(treatment_id);

-- 6. User_sessions table (독립)
CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_agent TEXT,
    ip_address INET,
    country_code VARCHAR(2),
    language VARCHAR(10) DEFAULT 'zh-CN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours'),
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);

-- 7. User_inputs table (user_sessions 참조)
CREATE TABLE user_inputs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES user_sessions(session_id),
    step_number INTEGER NOT NULL,
    selected_concerns JSONB, -- Array of selected concern IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_inputs_session ON user_inputs(session_id);

-- 8. Package_recommendations table (user_sessions, packages 참조)
CREATE TABLE package_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES user_sessions(session_id),
    package_id UUID REFERENCES packages(id),
    match_score DECIMAL(5,2),
    rank_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_recommendations_session ON package_recommendations(session_id);
CREATE INDEX idx_recommendations_package ON package_recommendations(package_id);

-- 9. Quotes table (user_sessions 참조)
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id VARCHAR(20) UNIQUE NOT NULL, -- Q202507010001 형식
    session_id UUID REFERENCES user_sessions(session_id),
    packages JSONB NOT NULL, -- 선택된 패키지 정보
    personal_info JSONB, -- 이름, 연락처 등
    total_price INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'KRW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
);

CREATE INDEX idx_quotes_quote_id ON quotes(quote_id);
CREATE INDEX idx_quotes_session ON quotes(session_id);
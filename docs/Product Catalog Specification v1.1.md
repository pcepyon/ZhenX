# 韩真选 Product Catalog Specification v1.1

**문서 버전**: 1.1  
**생성 일시**: 2025년 7월 1일  
**대상 독자**: 백엔드 개발자, 프론트엔드 개발자, 데이터베이스 관리자, 비즈니스 팀  
**문서 범위**: 시술 상품 데이터 정의, 패키지 구성 규칙, 가격 정책, API 연동 가이드  
**연관 문서**: Technical Specification v1.1, Algorithm Specification v1.1, UI/UX Design Specification v1.1  
**주요 변경**: Supabase 스키마, Next.js App Router API, MCP 데이터 입력, 세션 기반 추적

---

## 1. 개요

### 1.1 문서 목적
韩真选 서비스에서 제공할 실제 시술 상품과 패키지의 구조화된 데이터를 정의하고, 개발팀이 구현할 수 있는 명확한 사양을 제공합니다.

### 1.2 핵심 전략
```yaml
상품 구성 원칙:
  - 원데이 올킬: 중국 고객이 하루에 모든 시술 완료
  - 패키지 중심: 시너지 효과가 있는 시술 조합
  - 투명한 가격: VAT 포함 총액 표시
  - 단순화: 브랜드별 세분화 대신 효과 중심 구성

가격 정책:
  - 패키지 할인율: 10% (자동 적용)
  - VAT: 10% (별도 표시)
  - 가격대: 베이직(~50만원) / 프리미엄(100-200만원) / 럭셔리(200만원+)
  
데이터 관리:  # 변경: 추가
  - Supabase PostgreSQL 저장
  - MCP를 통한 초기 데이터 입력
  - 익명 세션별 추적
```

---

## 2. 데이터베이스 스키마 (Supabase)  # 변경: Supabase 명시

### 2.1 기본 시술 테이블 (treatments_base)
```sql
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

-- 인덱스
CREATE INDEX idx_treatments_category ON treatments_base(category_id);
CREATE INDEX idx_treatments_code ON treatments_base(code);
CREATE INDEX idx_treatments_active ON treatments_base(is_active);
```

### 2.2 패키지 정의 테이블 (packages)
```sql
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

-- 인덱스
CREATE INDEX idx_packages_category ON packages(category_id);
CREATE INDEX idx_packages_tier ON packages(price_tier);
CREATE INDEX idx_packages_concerns ON packages USING GIN(concern_tags);
CREATE INDEX idx_packages_active ON packages(is_active);
```

### 2.3 패키지 구성 시술 테이블 (package_items)
```sql
CREATE TABLE package_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
    treatment_id UUID REFERENCES treatments_base(id),
    quantity INTEGER DEFAULT 1,
    is_optional BOOLEAN DEFAULT false,
    display_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX idx_package_items_package ON package_items(package_id);
CREATE INDEX idx_package_items_treatment ON package_items(treatment_id);
```

### 2.4 카테고리 테이블 (categories)  # 변경: 추가
```sql
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
```

### 2.5 세부고민 테이블 (concerns)  # 변경: 추가
```sql
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
```

---

## 3. 기본 시술 카탈로그

### 3.1 리프팅/탄력 시술
```json
{
  "category": "elasticity",
  "treatments": [
    {
      "code": "LIFTERA_1000",
      "name_ko": "리프테라2 1000샷",
      "name_cn": "丽芙特拉2 1000发",
      "base_price": 59000,
      "duration_minutes": 30
    },
    {
      "code": "THREAD_LIFT_4",
      "name_ko": "잼버볼륨 실리프팅 4줄",
      "name_cn": "线雕提升 4根",
      "base_price": 296000,
      "duration_minutes": 40
    },
    {
      "code": "THREAD_LIFT_6",
      "name_ko": "잼버볼륨 실리프팅 6줄",
      "name_cn": "线雕提升 6根",
      "base_price": 490000,
      "duration_minutes": 60
    },
    {
      "code": "ULTHERA_300",
      "name_ko": "3D울쎄라 300샷",
      "name_cn": "3D超声刀 300发",
      "base_price": 790000,
      "duration_minutes": 60
    },
    {
      "code": "ULTHERA_600",
      "name_ko": "3D울쎄라 600샷",
      "name_cn": "3D超声刀 600发",
      "base_price": 2880000,
      "duration_minutes": 90
    },
    {
      "code": "ULTHERA_1000",
      "name_ko": "3D울쎄라 1000샷",
      "name_cn": "3D超声刀 1000发",
      "base_price": 4390000,
      "duration_minutes": 120
    },
    {
      "code": "THERMAGE_600",
      "name_ko": "써마지 600샷",
      "name_cn": "热玛吉 600发",
      "base_price": 1900000,
      "duration_minutes": 90
    },
    {
      "code": "LINEAR_300",
      "name_ko": "리니어지 300샷",
      "name_cn": "线性提升 300发",
      "base_price": 250000,
      "duration_minutes": 40
    },
    {
      "code": "INMODE_FACE",
      "name_ko": "인모드 FX+FORMA 얼굴전체",
      "name_cn": "因模德全脸",
      "base_price": 390000,
      "duration_minutes": 60
    }
  ]
}
```

### 3.2 보톡스 시술
```json
{
  "category": "wrinkles",
  "treatments": [
    {
      "code": "BOTOX_UPPER_KR",
      "name_ko": "[국산] 주름 보톡스 얼굴상부",
      "name_cn": "[国产] 面部上部除皱肉毒素",
      "base_price": 130000,
      "duration_minutes": 20
    },
    {
      "code": "BOTOX_SKIN_KR",
      "name_ko": "[국산] 얼굴전체 스킨 보톡스",
      "name_cn": "[国产] 全脸水光肉毒素",
      "base_price": 149000,
      "duration_minutes": 30
    },
    {
      "code": "BOTOX_JAW_ZEOMIN",
      "name_ko": "[제오민] 턱 보톡스 50유닛",
      "name_cn": "[Xeomin] 瘦脸针 50单位",
      "base_price": 89000,
      "duration_minutes": 15
    },
    {
      "code": "BOTOX_UPPER_ALLERGAN",
      "name_ko": "[엘러간] 주름 보톡스 얼굴상부",
      "name_cn": "[保妥适] 面部上部除皱",
      "base_price": 270000,
      "duration_minutes": 20
    }
  ]
}
```

### 3.3 필러/주사 시술
```json
{
  "category": "volume",
  "treatments": [
    {
      "code": "REJURAN_2CC",
      "name_ko": "리쥬란 힐러 2cc 1+1",
      "name_cn": "丽珠兰修复针 2cc 1+1",
      "base_price": 450000,
      "duration_minutes": 40
    },
    {
      "code": "REJURAN_EYE",
      "name_ko": "리쥬란 아이 1cc 1+1",
      "name_cn": "丽珠兰眼部 1cc 1+1",
      "base_price": 250000,
      "duration_minutes": 30
    },
    {
      "code": "FILLER_CHEEK_3CC",
      "name_ko": "[국산] 앞볼/옆볼 필러 3cc",
      "name_cn": "[国产] 苹果肌填充 3cc",
      "base_price": 360000,
      "duration_minutes": 30
    },
    {
      "code": "FILLER_TEMPLE_3CC",
      "name_ko": "[국산] 이마/관자필러 3cc",
      "name_cn": "[国产] 额头/太阳穴填充 3cc",
      "base_price": 390000,
      "duration_minutes": 30
    },
    {
      "code": "FILLER_10CC",
      "name_ko": "[국산] 필러 10cc",
      "name_cn": "[国产] 填充剂 10cc",
      "base_price": 990000,
      "duration_minutes": 60
    },
    {
      "code": "WATER_SHINE",
      "name_ko": "순수 물광주사 2.5CC",
      "name_cn": "水光针 2.5CC",
      "base_price": 90000,
      "duration_minutes": 30
    }
  ]
}
```

### 3.4 피부 관리 시술
```json
{
  "category": "skin_texture",
  "treatments": [
    {
      "code": "PICO_FRAXEL",
      "name_ko": "피코프락셀 + 진정관리 1회",
      "name_cn": "皮秒点阵激光 + 镇静管理",
      "base_price": 220000,
      "duration_minutes": 60
    },
    {
      "code": "PICO_TONING",
      "name_ko": "피코토닝 1회",
      "name_cn": "皮秒净肤 1次",
      "base_price": 89000,
      "duration_minutes": 30
    },
    {
      "code": "DUAL_TONING",
      "name_ko": "피코 듀얼토닝 1회",
      "name_cn": "皮秒双波净肤 1次",
      "base_price": 150000,
      "duration_minutes": 40
    },
    {
      "code": "AQUA_PEEL_5",
      "name_ko": "내맘대로 아쿠아필 5회",
      "name_cn": "定制水飞梭 5次",
      "base_price": 190000,
      "duration_minutes": 40
    },
    {
      "code": "LDM_CARE",
      "name_ko": "LDM 관리",
      "name_cn": "LDM管理",
      "base_price": 90000,
      "duration_minutes": 30
    }
  ]
}
```

### 3.5 바디 시술
```json
{
  "category": "body",
  "treatments": [
    {
      "code": "BODY_INMODE",
      "name_ko": "바디 인모드 1회",
      "name_cn": "身体因模德 1次",
      "base_price": 150000,
      "duration_minutes": 60
    },
    {
      "code": "BODY_INMODE_5",
      "name_ko": "바디 인모드 5회",
      "name_cn": "身体因模德 5次",
      "base_price": 600000,
      "duration_minutes": 60
    },
    {
      "code": "S_SLIM_10",
      "name_ko": "S슬림 주사 10회",
      "name_cn": "S瘦身针 10次",
      "base_price": 300000,
      "duration_minutes": 30
    },
    {
      "code": "LINEAR_BODY_1000",
      "name_ko": "리니어지 바디 1000샷",
      "name_cn": "身体线性提升 1000发",
      "base_price": 790000,
      "duration_minutes": 90
    }
  ]
}
```

---

## 4. 패키지 상품 정의

### 4.1 탄력 카테고리 패키지

#### 4.1.1 베이직 패키지
```json
{
  "package_code": "ELASTICITY_BASIC",
  "name_ko": "원데이 미니 리프팅",
  "name_cn": "一日迷你提升套餐",
  "category_id": "elasticity",
  "price_tier": "basic",
  "concern_tags": ["cheek_jaw_sagging", "double_chin", "fine_lines_early"],
  "items": [
    {
      "treatment_code": "LIFTERA_1000",
      "quantity": 1,
      "base_price": 59000
    },
    {
      "treatment_code": "THREAD_LIFT_4",
      "quantity": 1,
      "base_price": 296000
    },
    {
      "treatment_code": "BOTOX_JAW_ZEOMIN",
      "quantity": 1,
      "base_price": 89000
    }
  ],
  "price_calculation": {
    "total_base": 444000,
    "discount_rate": 0.10,
    "discount_amount": 44400,
    "package_price": 399600,
    "vat": 39960,
    "final_price": 439560
  },
  "duration_minutes": 85,
  "highlight_benefits": {
    "ko": ["즉시 V라인 효과", "회복기간 없음", "1시간 반 시술"],
    "cn": ["立即V脸效果", "无恢复期", "1.5小时完成"]
  }
}
```

#### 4.1.2 프리미엄 패키지
```json
{
  "package_code": "ELASTICITY_PREMIUM",
  "name_ko": "원데이 V라인 마스터",
  "name_cn": "一日V脸大师套餐",
  "category_id": "elasticity",
  "price_tier": "premium",
  "concern_tags": ["cheek_jaw_sagging", "double_chin", "subcutaneous_fat_sagging"],
  "items": [
    {
      "treatment_code": "ULTHERA_300",
      "quantity": 1,
      "base_price": 790000
    },
    {
      "treatment_code": "LINEAR_300",
      "quantity": 1,
      "base_price": 250000
    },
    {
      "treatment_code": "INMODE_FACE",
      "quantity": 1,
      "base_price": 390000
    },
    {
      "treatment_code": "BOTOX_JAW_ZEOMIN",
      "quantity": 1,
      "base_price": 89000
    }
  ],
  "price_calculation": {
    "total_base": 1519000,
    "discount_rate": 0.10,
    "discount_amount": 151900,
    "package_price": 1367100,
    "vat": 136710,
    "final_price": 1503810
  },
  "duration_minutes": 175,
  "highlight_benefits": {
    "ko": ["드라마틱한 리프팅 효과", "지방 감소 동시 진행", "3개월 지속"],
    "cn": ["显著提升效果", "同时减少脂肪", "效果持续3个月"]
  }
}
```

#### 4.1.3 럭셔리 패키지
```json
{
  "package_code": "ELASTICITY_LUXURY",
  "name_ko": "원데이 토탈 리프팅",
  "name_cn": "一日全面提升套餐",
  "category_id": "elasticity",
  "price_tier": "luxury",
  "concern_tags": ["cheek_jaw_sagging", "neck_sagging", "deep_wrinkles"],
  "items": [
    {
      "treatment_code": "ULTHERA_600",
      "quantity": 1,
      "base_price": 2880000
    },
    {
      "treatment_code": "THREAD_LIFT_6",
      "quantity": 1,
      "base_price": 490000
    }
  ],
  "price_calculation": {
    "total_base": 3370000,
    "discount_rate": 0.10,
    "discount_amount": 337000,
    "package_price": 3033000,
    "vat": 303300,
    "final_price": 3336300
  },
  "duration_minutes": 150,
  "highlight_benefits": {
    "ko": ["10년 젊어지는 효과", "목주름까지 개선", "1년 이상 지속"],
    "cn": ["年轻10岁效果", "改善颈纹", "效果持续1年以上"]
  }
}
```

#### 4.1.4 울트라 럭셔리 패키지
```json
{
  "package_code": "ELASTICITY_ULTRA",
  "name_ko": "원데이 풀페이스 리뉴얼",
  "name_cn": "一日全脸焕新套餐",
  "category_id": "elasticity",
  "price_tier": "ultra",
  "concern_tags": ["cheek_jaw_sagging", "neck_sagging", "deep_wrinkles", "volume_loss"],
  "items": [
    {
      "treatment_code": "ULTHERA_1000",
      "quantity": 1,
      "base_price": 4390000
    },
    {
      "treatment_code": "THERMAGE_600",
      "quantity": 1,
      "base_price": 1900000
    },
    {
      "treatment_code": "REJURAN_2CC",
      "quantity": 1,
      "base_price": 450000
    }
  ],
  "price_calculation": {
    "total_base": 6740000,
    "discount_rate": 0.10,
    "discount_amount": 674000,
    "package_price": 6066000,
    "vat": 606600,
    "final_price": 6672600
  },
  "duration_minutes": 250,
  "highlight_benefits": {
    "ko": ["최강 안티에이징", "울쎄라+써마지 시너지", "2년 이상 효과"],
    "cn": ["最强抗衰老", "超声刀+热玛吉协同", "效果持续2年以上"]
  }
}
```

### 4.2 볼륨 카테고리 패키지

#### 4.2.1 베이직 패키지
```json
{
  "package_code": "VOLUME_BASIC",
  "name_ko": "원데이 볼륨 부스터",
  "name_cn": "一日容积补充套餐",
  "category_id": "volume",
  "price_tier": "basic",
  "concern_tags": ["cheek_hollowing", "under_eye_hollowing"],
  "items": [
    {
      "treatment_code": "REJURAN_2CC",
      "quantity": 1,
      "base_price": 450000
    },
    {
      "treatment_code": "WATER_SHINE",
      "quantity": 1,
      "base_price": 90000
    }
  ],
  "price_calculation": {
    "total_base": 540000,
    "discount_rate": 0.10,
    "discount_amount": 54000,
    "package_price": 486000,
    "vat": 48600,
    "final_price": 534600
  },
  "duration_minutes": 70,
  "highlight_benefits": {
    "ko": ["자연스러운 볼륨", "수분 동시 보충", "즉각적 효과"],
    "cn": ["自然丰盈", "同时补水", "立即见效"]
  }
}
```

#### 4.2.2 프리미엄 패키지
```json
{
  "package_code": "VOLUME_PREMIUM",
  "name_ko": "원데이 베이비페이스",
  "name_cn": "一日童颜套餐",
  "category_id": "volume",
  "price_tier": "premium",
  "concern_tags": ["cheek_hollowing", "temple_hollowing", "lip_volume_loss"],
  "items": [
    {
      "treatment_code": "FILLER_CHEEK_3CC",
      "quantity": 1,
      "base_price": 360000
    },
    {
      "treatment_code": "FILLER_TEMPLE_3CC",
      "quantity": 1,
      "base_price": 390000
    },
    {
      "treatment_code": "REJURAN_2CC",
      "quantity": 1,
      "base_price": 450000
    },
    {
      "treatment_code": "BOTOX_SKIN_KR",
      "quantity": 1,
      "base_price": 149000
    }
  ],
  "price_calculation": {
    "total_base": 1349000,
    "discount_rate": 0.10,
    "discount_amount": 134900,
    "package_price": 1214100,
    "vat": 121410,
    "final_price": 1335510
  },
  "duration_minutes": 120,
  "highlight_benefits": {
    "ko": ["입체적인 동안 얼굴", "1년 이상 지속", "자연스러운 볼륨감"],
    "cn": ["立体童颜", "效果持续1年以上", "自然丰满感"]
  }
}
```

### 4.3 주름 카테고리 패키지

#### 4.3.1 베이직 패키지
```json
{
  "package_code": "WRINKLE_BASIC",
  "name_ko": "원데이 주름 케어",
  "name_cn": "一日除皱护理套餐",
  "category_id": "wrinkles",
  "price_tier": "basic",
  "concern_tags": ["fine_wrinkles", "forehead_wrinkles", "crow_feet"],
  "items": [
    {
      "treatment_code": "BOTOX_UPPER_KR",
      "quantity": 1,
      "base_price": 130000
    },
    {
      "treatment_code": "BOTOX_SKIN_KR",
      "quantity": 1,
      "base_price": 149000
    },
    {
      "treatment_code": "REJURAN_EYE",
      "quantity": 1,
      "base_price": 250000
    }
  ],
  "price_calculation": {
    "total_base": 529000,
    "discount_rate": 0.10,
    "discount_amount": 52900,
    "package_price": 476100,
    "vat": 47610,
    "final_price": 523710
  },
  "duration_minutes": 70,
  "highlight_benefits": {
    "ko": ["표정주름 개선", "피부결 개선", "눈가 집중 케어"],
    "cn": ["改善表情纹", "改善肤质", "眼部集中护理"]
  }
}
```

### 4.4 피부결·모공 카테고리 패키지

#### 4.4.1 베이직 패키지
```json
{
  "package_code": "TEXTURE_BASIC",
  "name_ko": "원데이 스킨 리파인",
  "name_cn": "一日肌肤细致套餐",
  "category_id": "skin_texture",
  "price_tier": "basic",
  "concern_tags": ["large_pores", "rough_texture", "blackheads_whiteheads"],
  "items": [
    {
      "treatment_code": "PICO_FRAXEL",
      "quantity": 1,
      "base_price": 220000
    },
    {
      "treatment_code": "AQUA_PEEL_5",
      "quantity": 1,
      "base_price": 190000
    },
    {
      "treatment_code": "WATER_SHINE",
      "quantity": 1,
      "base_price": 90000
    }
  ],
  "price_calculation": {
    "total_base": 500000,
    "discount_rate": 0.10,
    "discount_amount": 50000,
    "package_price": 450000,
    "vat": 45000,
    "final_price": 495000
  },
  "duration_minutes": 130,
  "highlight_benefits": {
    "ko": ["즉각적 모공 개선", "매끄러운 피부결", "수분 공급"],
    "cn": ["立即改善毛孔", "光滑肌理", "补充水分"]
  }
}
```

### 4.5 색소 카테고리 패키지

#### 4.5.1 베이직 패키지
```json
{
  "package_code": "PIGMENT_BASIC",
  "name_ko": "원데이 브라이트닝",
  "name_cn": "一日美白套餐",
  "category_id": "pigmentation",
  "price_tier": "basic",
  "concern_tags": ["melasma_freckles", "dark_spots", "dull_uneven_tone"],
  "items": [
    {
      "treatment_code": "PICO_TONING",
      "quantity": 1,
      "base_price": 89000
    },
    {
      "treatment_code": "DUAL_TONING",
      "quantity": 1,
      "base_price": 150000
    },
    {
      "treatment_code": "WATER_SHINE",
      "quantity": 1,
      "base_price": 90000
    },
    {
      "treatment_code": "LDM_CARE",
      "quantity": 1,
      "base_price": 90000
    }
  ],
  "price_calculation": {
    "total_base": 419000,
    "discount_rate": 0.10,
    "discount_amount": 41900,
    "package_price": 377100,
    "vat": 37710,
    "final_price": 414810
  },
  "duration_minutes": 130,
  "highlight_benefits": {
    "ko": ["기미잡티 개선", "피부톤 균일", "즉각적 화이트닝"],
    "cn": ["改善色斑", "均匀肤色", "立即美白"]
  }
}
```

### 4.6 바디 카테고리 패키지

#### 4.6.1 베이직 패키지
```json
{
  "package_code": "BODY_BASIC",
  "name_ko": "원데이 바디 슬림",
  "name_cn": "一日纤体套餐",
  "category_id": "body",
  "price_tier": "basic",
  "concern_tags": ["localized_fat", "cellulite"],
  "items": [
    {
      "treatment_code": "BODY_INMODE",
      "quantity": 1,
      "base_price": 150000
    },
    {
      "treatment_code": "S_SLIM_10",
      "quantity": 1,
      "base_price": 300000
    }
  ],
  "price_calculation": {
    "total_base": 450000,
    "discount_rate": 0.10,
    "discount_amount": 45000,
    "package_price": 405000,
    "vat": 40500,
    "final_price": 445500
  },
  "duration_minutes": 90,
  "highlight_benefits": {
    "ko": ["부분 지방 감소", "탄력 개선", "순환 개선"],
    "cn": ["局部减脂", "改善弹性", "促进循环"]
  }
}
```

---

## 5. API 연동 가이드 (Next.js App Router)  # 변경: 전체 수정

### 5.1 카테고리 조회
```typescript
// app/api/v1/categories/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(
    { categories },
    { 
      headers: { 
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' 
      } 
    }
  );
}
```

### 5.2 패키지 목록 조회
```typescript
// app/api/v1/packages/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const priceTier = searchParams.get('price_tier');
  
  const supabase = createClient();
  
  let query = supabase
    .from('packages')
    .select(`
      *,
      package_items (
        *,
        treatment:treatments_base (*)
      )
    `)
    .eq('is_active', true);
    
  if (category) query = query.eq('category_id', category);
  if (priceTier) query = query.eq('price_tier', priceTier);
  
  const { data: packages, error } = await query.order('display_order');
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ packages });
}
```

### 5.3 패키지 상세 정보
```typescript
// app/api/v1/packages/[packageCode]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { packageCode: string } }
) {
  const supabase = createClient();
  
  const { data: packageData, error } = await supabase
    .from('packages')
    .select(`
      *,
      package_items (
        *,
        treatment:treatments_base (*)
      )
    `)
    .eq('package_code', params.packageCode)
    .single();
    
  if (error || !packageData) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }
  
  // 가격 계산 정보 구성
  const priceBreakdown = {
    subtotal: packageData.package_items.reduce(
      (sum: number, item: any) => sum + (item.treatment.base_price * item.quantity), 
      0
    ),
    discount: 0,
    package_price: 0,
    vat: 0,
    total: packageData.final_price
  };
  
  priceBreakdown.discount = Math.round(priceBreakdown.subtotal * 0.1);
  priceBreakdown.package_price = priceBreakdown.subtotal - priceBreakdown.discount;
  priceBreakdown.vat = Math.round(priceBreakdown.package_price * 0.1);
  
  return NextResponse.json({
    package: {
      ...packageData,
      price_breakdown: priceBreakdown
    }
  });
}
```

### 5.4 가격 계산 API
```typescript
// app/api/v1/calculate-price/route.ts
export async function POST(request: Request) {
  const { items, apply_package_discount } = await request.json();
  const supabase = createClient();
  
  let itemsTotal = 0;
  
  // 각 시술 가격 조회 및 합산
  for (const item of items) {
    const { data: treatment } = await supabase
      .from('treatments_base')
      .select('base_price')
      .eq('code', item.treatment_code)
      .single();
      
    if (treatment) {
      itemsTotal += treatment.base_price * item.quantity;
    }
  }
  
  const packageDiscount = apply_package_discount ? Math.round(itemsTotal * 0.1) : 0;
  const subtotal = itemsTotal - packageDiscount;
  const vat = Math.round(subtotal * 0.1);
  const finalTotal = subtotal + vat;
  
  return NextResponse.json({
    calculation: {
      items_total: itemsTotal,
      package_discount: packageDiscount,
      subtotal: subtotal,
      vat: vat,
      final_total: finalTotal
    },
    currency: 'KRW',
    exchange_reference: {
      CNY: Math.round(finalTotal / 190)  // 참고 환율
    }
  });
}
```

---

## 6. 비즈니스 규칙

### 6.1 가격 계산 규칙
```yaml
패키지 할인:
  - 2개 이상 시술 조합 시: 10% 할인
  - 할인은 기본가에서 적용
  - VAT는 할인 후 금액에 적용

가격 표시:
  - 웹사이트: VAT 포함가 표시
  - 견적서: 기본가 + VAT 별도 표시
  - 중국어: 위안화 참고 환율 표시 (1위안 = 190원)

프로모션:
  - 첫 방문 고객: 추가 5% 할인 가능
  - 재방문 고객: VIP 혜택 적용
```

### 6.2 예약 가능 규칙
```yaml
시술 조합:
  - 같은 날 최대 시술 시간: 6시간
  - 보톡스 + 필러: 가능
  - 울쎄라 + 써마지: 의사 상담 필요
  - 레이저 중복: 피부 타입 확인 필요

회복 기간:
  - 즉시 일상: 보톡스, 필러, 토닝
  - 1-3일: 프락셀, 울쎄라
  - 5-7일: 실리프팅 다수
```

---

## 7. 데이터 초기화 (Supabase MCP)  # 변경: 전체 수정

### 7.1 MCP를 통한 자동 데이터 입력
```yaml
데이터 입력 프로세스:
  1. Supabase MCP 설정:
     - 프로젝트 URL 설정
     - Service Role Key 설정
     
  2. AI Agent 명령:
     "Product Catalog Specification v1.1의 모든 데이터를 Supabase에 입력해줘"
     
  3. 자동 실행 순서:
     - categories 테이블: 6개 카테고리
     - concerns 테이블: 30개 세부고민  
     - treatments_base: 약 40개 시술
     - packages: 10개 패키지
     - package_items: 패키지별 구성 (약 30개 관계)
     
  4. 데이터 검증:
     - 외래키 관계 확인
     - 가격 계산 검증
     - 필수 필드 확인
```

### 7.2 수동 데이터 입력 스크립트 (MCP 사용 불가시)
```typescript
// scripts/seed-data.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedCategories() {
  const categories = [
    { id: 'elasticity', name: '탄력', icon: '🎈', description: '피부 처짐과 탄력 개선', display_order: 1 },
    { id: 'volume', name: '볼륨', icon: '💧', description: '볼륨 손실 개선', display_order: 2 },
    { id: 'wrinkles', name: '주름', icon: '〰️', description: '주름 개선', display_order: 3 },
    { id: 'skin_texture', name: '피부결·모공', icon: '✨', description: '피부결과 모공 개선', display_order: 4 },
    { id: 'pigmentation', name: '색소', icon: '🎨', description: '색소 침착 개선', display_order: 5 },
    { id: 'body', name: '바디', icon: '💃', description: '바디 라인 개선', display_order: 6 }
  ];
  
  const { error } = await supabase.from('categories').insert(categories);
  if (error) console.error('Categories insert error:', error);
  else console.log('✅ Categories seeded');
}

// 나머지 테이블도 동일한 방식으로 구현
```

### 7.3 CSV Import 방법
```yaml
CSV 파일 준비:
  1. treatments.csv:
     - columns: code, name_ko, name_cn, category_id, base_price, duration_minutes
     
  2. packages.csv:
     - columns: package_code, name_ko, name_cn, category_id, price_tier, final_price
     
  3. Supabase Dashboard에서 Import:
     - Table Editor → Import Data
     - CSV 파일 선택
     - 컬럼 매핑 확인
```

---

## 8. 모니터링 및 분석

### 8.1 주요 지표
```yaml
상품 성과:
  - 패키지별 조회수 (세션 기반)  # 변경: 세션 기반
  - 패키지별 견적서 생성율
  - 평균 견적 금액
  - 카테고리별 인기도

가격 분석:
  - 가격대별 선호도
  - 할인 민감도
  - 패키지 vs 단품 비율
  
세션 분석:  # 변경: 추가
  - 평균 세션 시간
  - 단계별 이탈률
  - 견적서 공유율
```

### 8.2 A/B 테스트
```yaml
테스트 항목:
  - 패키지 구성 (3개 vs 4개 시술)
  - 가격 표시 (할인율 vs 절약 금액)
  - 혜택 표현 (한국어 vs 중국어 우선)
  - 견적서 유효기간 (7일 vs 14일)  # 변경: 추가
```

### 8.3 Vercel Analytics 활용  # 변경: 추가
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

// 커스텀 이벤트 추적
import { track } from '@vercel/analytics';

// 패키지 조회 추적
track('package_viewed', {
  package_code: 'ELASTICITY_BASIC',
  price_tier: 'basic',
  session_id: sessionId
});

// 견적서 생성 추적
track('quote_created', {
  total_price: 1500000,
  package_count: 2,
  session_id: sessionId
});
```

---

이 Product Catalog Specification v1.1은 Supabase 데이터베이스 구조, Next.js App Router API, MCP 데이터 입력 방식 등 Technical Specification v1.1의 모든 변경사항을 반영했습니다. 특히 익명 세션 기반 추적과 웹페이지 견적서 시스템에 맞춰 데이터 구조와 API를 재설계했습니다.
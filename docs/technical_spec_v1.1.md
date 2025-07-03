# 韩真选 Technical Specification v1.1 (Vercel + Supabase MVP)

**문서 버전**: 1.1  
**생성 일시**: 2025년 7월 1일  
**대상 독자**: 프론트엔드 개발자, 풀스택 개발자  
**문서 범위**: Vercel + Supabase 아키텍처, DB 스키마, API 설계, MVP 배포 가이드  
**주요 변경**: 인증 제거, MCP 데이터 입력, 웹페이지 견적서, MVP 수준 보안

---

## 1. 시스템 아키텍처

### 1.1 전체 구조 (Serverless Architecture)
```
┌─────────────────────┐    ┌──────────────────────┐
│   Next.js App       │    │     Supabase         │
│   (Vercel)          │◄───┤  - PostgreSQL DB     │
│   - Pages           │    │  - Storage           │
│   - API Routes      │    │  - Realtime (선택적) │
└─────────────────────┘    └──────────────────────┘
           │                          
           └─────────────────────────┐
                                     │
                            ┌────────────────┐
                            │  External      │
                            │  - CDN         │
                            └────────────────┘
```

### 1.2 기술 스택
```yaml
Frontend & Backend:
  framework: "Next.js 14 (App Router)"
  language: "TypeScript"
  styling: "Tailwind CSS + shadcn/ui"
  state: "Zustand"
  api_client: "TanStack Query"
  i18n: "next-i18next"

Database:
  platform: "Supabase"
  database: "PostgreSQL 15"
  storage: "Supabase Storage (이미지용)"
  
Hosting:
  platform: "Vercel"
  functions: "Vercel Serverless Functions"
  cdn: "Vercel Edge Network"
  
Development:
  package_manager: "pnpm"
  data_input: "Supabase MCP"
```

---

## 2. 데이터베이스 설계 (Supabase)

### 2.1 ERD (Entity Relationship Diagram)
```
categories (대카테고리)
├── id (PK)
├── name
├── icon
└── description

concerns (세부고민)  
├── id (PK)
├── category_id (FK)
├── name
├── description
└── display_order

treatments_base (기본시술정보)
├── id (PK) 
├── code
├── name_ko
├── name_cn
├── category_id (FK)
├── base_price
├── vat_rate
├── duration_minutes
└── metadata (JSONB)

packages (패키지정보)
├── id (PK)
├── package_code
├── name_ko
├── name_cn
├── category_id (FK)
├── price_tier
├── final_price
├── highlight_benefits (JSONB)
└── is_active

package_items (패키지구성)
├── id (PK)
├── package_id (FK)
├── treatment_id (FK)
├── quantity
└── display_order

user_sessions (사용자세션 - 익명)
├── session_id (PK)
├── user_agent
├── ip_address
├── created_at
└── expires_at

user_inputs (사용자입력)
├── id (PK)
├── session_id (FK)
├── step_number
├── selected_concerns (JSONB)
└── created_at

package_recommendations (패키지추천)
├── id (PK)
├── session_id (FK)
├── package_id (FK)
├── match_score
├── rank_order
└── created_at

quotes (견적서)
├── id (PK)
├── quote_id (고유번호)
├── session_id (FK)
├── packages (JSONB)
├── total_price
├── created_at
└── expires_at
```

### 2.2 테이블 스키마

#### 2.2.1 categories (대카테고리)
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

#### 2.2.2 user_sessions (익명 세션)
```sql
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
```

#### 2.2.3 quotes (웹페이지 견적서)
```sql
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
```

---

## 3. API 설계 (Next.js App Router)

### 3.1 API 구조
```
app/
├── api/
│   └── v1/
│       ├── categories/
│       │   └── route.ts                    # GET /api/v1/categories
│       ├── sessions/
│       │   └── route.ts                    # POST /api/v1/sessions
│       ├── sessions/[sessionId]/
│       │   ├── inputs/route.ts             # POST 사용자 입력
│       │   ├── recommendations/route.ts    # POST 패키지 추천
│       │   └── quotes/route.ts             # POST 견적서 생성
│       └── packages/
│           └── [packageCode]/route.ts      # GET 패키지 상세
├── quote/
│   └── [quoteId]/
│       └── page.tsx                        # 견적서 웹페이지
```

### 3.2 주요 API 구현

#### 3.2.1 세션 생성 (익명)
```typescript
// app/api/v1/sessions/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const body = await request.json();
  
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for'),
        language: body.language || 'zh-CN',
        country_code: request.geo?.country || 'CN'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // 세션 쿠키 설정
    const response = NextResponse.json({
      success: true,
      data: {
        session_id: data.session_id,
        expires_at: data.expires_at
      }
    });
    
    response.cookies.set('session_id', data.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24시간
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

#### 3.2.2 패키지 추천
```typescript
// app/api/v1/sessions/[sessionId]/recommendations/route.ts
export const maxDuration = 30; // 30초 제한

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const supabase = createClient();
  
  try {
    // 1. 사용자 입력 조회
    const { data: userInputs } = await supabase
      .from('user_inputs')
      .select('*')
      .eq('session_id', params.sessionId)
      .order('step_number');
    
    // 2. 패키지 데이터 조회
    const { data: packages } = await supabase
      .from('packages')
      .select(`
        *,
        package_items (
          *,
          treatment:treatments_base (*)
        )
      `)
      .eq('is_active', true);
    
    // 3. 추천 알고리즘 실행 (간단한 매칭)
    const recommendations = calculateSimpleRecommendations(
      packages,
      userInputs
    );
    
    // 4. 결과 저장
    await supabase
      .from('package_recommendations')
      .insert(recommendations);
    
    return NextResponse.json({
      success: true,
      data: { recommendations }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

#### 3.2.3 견적서 생성 (웹페이지용)
```typescript
// app/api/v1/sessions/[sessionId]/quotes/route.ts
export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const supabase = createClient();
  const { selected_packages, personal_info } = await request.json();
  
  try {
    // 1. 패키지 정보 조회
    const { data: packages } = await supabase
      .from('packages')
      .select('*')
      .in('package_code', selected_packages);
    
    // 2. 견적서 ID 생성
    const quoteId = `Q${Date.now().toString().slice(-8)}`;
    
    // 3. 견적 정보 저장
    const { data: quote, error } = await supabase
      .from('quotes')
      .insert({
        quote_id: quoteId,
        session_id: params.sessionId,
        packages: packages,
        personal_info: personal_info,
        total_price: packages.reduce((sum, pkg) => sum + pkg.final_price, 0)
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: {
        quote_id: quoteId,
        quote_url: `/quote/${quoteId}`,
        total_price: quote.total_price
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### 3.3 견적서 페이지
```typescript
// app/quote/[quoteId]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function QuotePage({ 
  params 
}: { 
  params: { quoteId: string } 
}) {
  const supabase = createClient();
  
  const { data: quote } = await supabase
    .from('quotes')
    .select('*')
    .eq('quote_id', params.quoteId)
    .single();
  
  if (!quote) notFound();
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">韩真选 의료미용 견적서</h1>
          <p className="text-gray-600 mt-2">견적번호: {quote.quote_id}</p>
          <p className="text-sm text-gray-500">
            유효기간: {new Date(quote.expires_at).toLocaleDateString()}
          </p>
        </div>
        
        {/* 패키지 목록 */}
        <div className="space-y-4 mb-8">
          {quote.packages.map((pkg: any) => (
            <div key={pkg.package_code} className="border rounded-lg p-4">
              <h3 className="font-semibold">{pkg.name_ko}</h3>
              <p className="text-gray-600">{pkg.name_cn}</p>
              <div className="mt-2 text-right">
                <span className="text-lg font-bold">
                  ₩{pkg.final_price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 총액 */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">총액</span>
            <span className="text-2xl font-bold text-primary">
              ₩{quote.total_price.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-500 text-right">
            (약 ¥{Math.round(quote.total_price / 158).toLocaleString()})
          </p>
        </div>
        
        {/* 공유 버튼 */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex-1 btn btn-secondary"
          >
            링크 복사
          </button>
          <button className="flex-1 btn btn-primary">
            WeChat 공유
          </button>
        </div>
      </div>
    </div>
  );
}

// 메타데이터 (SEO/공유)
export async function generateMetadata({ params }: { params: { quoteId: string } }) {
  const supabase = createClient();
  const { data: quote } = await supabase
    .from('quotes')
    .select('total_price, packages')
    .eq('quote_id', params.quoteId)
    .single();
  
  return {
    title: `韩真选 견적서 - ${params.quoteId}`,
    description: `총 ${quote?.packages?.length || 0}개 패키지, ₩${quote?.total_price?.toLocaleString() || 0}`,
    openGraph: {
      title: '韩真选 의료미용 견적서',
      description: '한국 의료미용 패키지 견적',
      images: ['/og-quote.jpg']
    }
  };
}
```

---

## 4. 초기 데이터 설정 (Supabase MCP)

### 4.1 MCP를 통한 자동 데이터 입력
```yaml
데이터 입력 프로세스:
  1. Supabase MCP 연결:
     - 프로젝트 URL 설정
     - Service Role Key 설정
     
  2. AI Agent 명령:
     "Product Catalog Specification v1.0의 데이터를 Supabase에 입력해줘"
     
  3. 자동 실행 순서:
     - categories 테이블: 6개 카테고리
     - concerns 테이블: 30개 세부고민
     - treatments_base: 약 40개 시술
     - packages: 10개 패키지
     - package_items: 패키지별 구성
     
  4. 데이터 검증:
     - 관계 무결성 확인
     - 가격 계산 검증
```

### 4.2 수동 백업 방법 (MCP 사용 불가시)
```sql
-- seed.sql
INSERT INTO categories (id, name, icon, description, display_order) VALUES
('elasticity', '탄력', '🎈', '피부 처짐과 탄력 개선', 1),
('volume', '볼륨', '💧', '볼륨 손실 개선', 2),
('wrinkles', '주름', '〰️', '주름 개선', 3),
('skin_texture', '피부결·모공', '✨', '피부결과 모공 개선', 4),
('pigmentation', '색소', '🎨', '색소 침착 개선', 5),
('body', '바디', '💃', '바디 라인 개선', 6);

-- 또는 CSV Import 사용
```

---

## 5. 보안 요구사항 (MVP)

### 5.1 기본 보안 설정
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 간단한 Rate Limiting
const rateLimit = new Map();

export function middleware(request: NextRequest) {
  // 1. Rate Limiting (IP당 분당 100 요청)
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1분
  
  const requestCount = rateLimit.get(ip) || [];
  const recentRequests = requestCount.filter((time: number) => now - time < windowMs);
  
  if (recentRequests.length >= 100) {
    return new Response('Too Many Requests', { status: 429 });
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  
  // 2. 기본 보안 헤더
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}

export const config = {
  matcher: '/api/:path*'
};
```

### 5.2 입력값 검증
```typescript
// lib/validation.ts
export function validateSessionId(sessionId: string): boolean {
  // UUID 형식 검증
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}

export function validatePackageCode(code: string): boolean {
  // 패키지 코드 형식 검증
  const codeRegex = /^[A-Z_]+$/;
  return codeRegex.test(code) && code.length < 50;
}

// API에서 사용
if (!validateSessionId(params.sessionId)) {
  return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
}
```

### 5.3 환경변수 보안
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx  # Public key (RLS 보호)
SUPABASE_SERVICE_ROLE_KEY=xxx      # Secret (서버에서만)
```

---

## 6. 캐싱 전략 (간단)

### 6.1 Next.js 기본 캐싱
```typescript
// 정적 데이터는 캐싱
export const revalidate = 3600; // 1시간

// 동적 데이터는 캐싱 안함
export const dynamic = 'force-dynamic';

// 카테고리 조회 (캐싱됨)
export async function GET() {
  const supabase = createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true);
    
  return NextResponse.json(
    { data },
    { headers: { 'Cache-Control': 'public, s-maxage=3600' } }
  );
}
```

---

## 7. 배포 프로세스

### 7.1 개발 환경 설정
```bash
# 1. 프로젝트 생성
npx create-next-app@latest hanzhengxuan --typescript --tailwind --app
cd hanzhengxuan

# 2. 의존성 설치
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add zustand @tanstack/react-query
pnpm add -D @types/node
```

### 7.2 Vercel 배포
```yaml
배포 단계:
  1. GitHub 저장소 생성 및 푸시
  
  2. Vercel 프로젝트 연결:
     - Import Git Repository
     - Framework: Next.js
     - Root Directory: ./
     
  3. 환경변수 설정:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY
     
  4. 배포 설정:
     - Region: Seoul (icn1)
     - Node.js Version: 18.x
     
  5. Deploy 클릭
```

### 7.3 vercel.json 설정
```json
{
  "functions": {
    "app/api/v1/sessions/[sessionId]/recommendations/route.ts": {
      "maxDuration": 30
    }
  },
  "regions": ["icn1"]
}
```

---

## 8. 모니터링 (선택적)

### 8.1 Vercel Analytics
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
```

### 8.2 에러 로깅
```typescript
// 콘솔 로그로 충분 (MVP)
console.error('API Error:', error);

// Vercel 로그에서 확인 가능
```

---

## 9. 개발 체크리스트

### 9.1 MVP 필수 기능
- [ ] Supabase 프로젝트 생성
- [ ] DB 스키마 생성
- [ ] MCP로 초기 데이터 입력
- [ ] 3단계 위자드 페이지
- [ ] 패키지 추천 API
- [ ] 견적서 웹페이지
- [ ] 기본 스타일링
- [ ] Vercel 배포

### 9.2 Post-MVP (나중에)
- [ ] 실시간 기능
- [ ] 고급 캐싱
- [ ] A/B 테스트
- [ ] 상세 분석
- [ ] 이미지 최적화

---

## 10. 주의사항

### 10.1 중국 접속 고려
```typescript
// 중국에서도 접속 가능한 CDN/폰트 사용
// Google Fonts 대신 로컬 폰트
// Analytics는 Baidu 고려
```

### 10.2 성능 목표
```yaml
MVP 목표:
  - 첫 페이지 로드: < 3초
  - API 응답: < 2초
  - 견적서 생성: < 3초
  
측정 도구:
  - Vercel Speed Insights
  - Chrome DevTools
```

---

이 Technical Specification v1.1은 MVP 배포에 필요한 최소한의 기능과 설정만 포함합니다. 복잡한 인증, PDF 생성, 고급 캐싱 등은 제거하고 빠른 배포에 집중했습니다.
# 韩真选 프로젝트 TODO 리스트

## 프로젝트 개요
- **프로젝트명**: 韩真选 (중국인 의료관광객 패키지 큐레이션 서비스)
- **기술 스택**: Next.js 14, TypeScript, Tailwind CSS, Supabase, Vercel
- **개발 환경**: macOS, VS Code, pnpm
- **최종 목표**: 익명 세션 기반 3단계 위자드로 맞춤 패키지를 추천하고 웹 견적서를 생성하는 MVP

## 전체 아키텍처 다이어그램
```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐            │
│  │  Landing   │→ │  3-Step     │→ │ Recommendation│            │
│  │   Page     │  │  Wizard     │  │    Results    │            │
│  └────────────┘  └─────────────┘  └──────────────┘            │
│         │              │                    │                    │
│         └──────────────┴────────────────────┘                   │
│                        ↓                                         │
│  ┌─────────────────────────────────────────────────┐           │
│  │              API Routes (/api/v1/*)              │           │
│  └─────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                        Supabase Backend                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐        │
│  │  PostgreSQL │  │   Storage    │  │  Edge Functions│        │
│  │  Database   │  │  (Images)    │  │   (Optional)   │        │
│  └─────────────┘  └──────────────┘  └────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 요약

### Phase 1: 기초 인프라 및 데이터베이스 (Day 1-2)
**목표**: Supabase 프로젝트 설정, DB 스키마 구축, 초기 데이터 입력
**산출물**: 완성된 데이터베이스, 초기 카탈로그 데이터
**체크포인트**: Supabase Dashboard에서 모든 테이블과 데이터 확인

### Phase 2: Next.js 프로젝트 및 기본 API (Day 3-4)
**목표**: Next.js 프로젝트 생성, 기본 API 라우트 구현
**산출물**: 작동하는 API 엔드포인트, 세션 관리 시스템
**체크포인트**: Postman으로 API 테스트 완료

### Phase 3: 프론트엔드 기본 구조 (Day 5-7)
**목표**: 레이아웃, 컴포넌트 시스템, 상태 관리 구축
**산출물**: 재사용 가능한 컴포넌트, Zustand 스토어
**체크포인트**: 스토리북에서 컴포넌트 확인

### Phase 4: 핵심 기능 구현 (Day 8-10)
**목표**: 3단계 위자드, 패키지 추천 알고리즘, 결과 화면
**산출물**: 완성된 추천 플로우, 추천 결과 화면
**체크포인트**: 전체 플로우 E2E 테스트

### Phase 5: 견적서 시스템 (Day 11-12)
**목표**: 견적서 생성 및 공유 기능
**산출물**: 웹 견적서 페이지, 공유 기능
**체크포인트**: 견적서 URL 공유 테스트

### Phase 6: 최종 테스트 및 배포 (Day 13-14)
**목표**: 성능 최적화, 버그 수정, Vercel 배포
**산출물**: 프로덕션 배포된 서비스
**체크포인트**: 실제 사용자 테스트

---

## 상세 TODO 리스트

### Phase 1: 기초 인프라 및 데이터베이스

## TODO-001: Supabase 프로젝트 생성 및 설정

### 📋 작업 개요
- 작업 유형: Setup

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **없음** (첫 번째 작업)

#### 🎯 현재 작업
- **목표**: Supabase 프로젝트를 생성하고 기본 설정 완료
  
  산출물:
  - Supabase 프로젝트 생성 완료
  - 환경변수 파일:
    - `.env.local` - 환경변수 설정
      - `NEXT_PUBLIC_SUPABASE_URL`
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
      - `SUPABASE_SERVICE_ROLE_KEY`
  
  - 프로젝트 설정:
    - 리전: Singapore (가장 가까운 아시아 리전)
    - 프로젝트명: hanzhengxuan-mvp

#### 📤 다음 작업에 전달하는 것
- **TODO-002: 데이터베이스 스키마 생성**
  
  전달 내용:
  - Supabase 프로젝트 URL
  - 데이터베이스 접속 정보
  - Service Role Key (MCP 사용용)
  
  주의사항:
  - ⚠️ Service Role Key는 절대 클라이언트에 노출하지 말 것
  - ⚠️ .env.local을 .gitignore에 추가 확인

### 📚 참조 문서
- Technical Specification v1.1 섹션 2 - 데이터베이스 설계
- Technical Specification v1.1 섹션 5.3 - 환경변수 보안

### ✅ 완료 조건
1. [ ] Supabase 대시보드 접속 가능
2. [ ] 환경변수 파일 생성 완료
3. [ ] 프로젝트 설정 확인

### 🧪 검증 방법
```bash
# 환경변수 확인
cat .env.local

# Supabase 접속 테스트 (브라우저)
# https://app.supabase.com/project/[project-ref]
```

### ⚠️ 주의사항
- 무료 티어 제한 확인 (500MB 데이터베이스)
- 리전 선택 후 변경 불가

---

## TODO-002: 데이터베이스 스키마 생성

### 📋 작업 개요
- 작업 유형: Database

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-001: Supabase 프로젝트 생성**
  
  받은 것:
  - Supabase 프로젝트 URL
  - 데이터베이스 접속 정보
  - Service Role Key

#### 🎯 현재 작업
- **목표**: Technical Spec의 DB 스키마를 Supabase에 생성
  
  입력 자원:
  - 파일:
    - `technical_spec_v1.1.md` 섹션 2.2 - 테이블 스키마
  
  산출물:
  - 생성된 테이블:
    - `categories` - 6개 대카테고리
    - `concerns` - 30개 세부고민
    - `treatments_base` - 기본 시술 정보
    - `packages` - 패키지 정보
    - `package_items` - 패키지 구성
    - `user_sessions` - 익명 세션
    - `user_inputs` - 사용자 입력
    - `package_recommendations` - 추천 결과
    - `quotes` - 견적서
  
  - SQL 스크립트:
    - `supabase/migrations/001_initial_schema.sql`

#### 📤 다음 작업에 전달하는 것
- **TODO-003: MCP로 초기 데이터 입력**
  
  전달 내용:
  - 완성된 테이블 구조
  - 외래키 관계 설정 완료
  - 인덱스 생성 완료
  
  주의사항:
  - ⚠️ 테이블 생성 순서 중요 (외래키 의존성)
  - ⚠️ UUID 타입 사용 확인

### 📚 참조 문서
- Technical Specification v1.1 섹션 2.2 - 테이블 스키마
- Product Catalog Specification v1.1 섹션 2 - 데이터베이스 스키마

### ✅ 완료 조건
1. [ ] 모든 테이블 생성 완료
2. [ ] 외래키 관계 설정 완료
3. [ ] 인덱스 생성 완료
4. [ ] RLS 정책 설정 (public 읽기 허용)

### 🧪 검증 방법
```sql
-- Supabase SQL Editor에서 실행
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- 테이블 수 확인 (9개여야 함)
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
```

### ⚠️ 주의사항
- RLS(Row Level Security) 기본값은 비활성화
- 마이그레이션 파일로 버전 관리

### 🚨 일반적인 문제와 해결
1. **문제**: 외래키 제약 조건 오류
   - 증상: "foreign key constraint" 에러
   - 원인: 참조 테이블이 먼저 생성되지 않음
   - 해결: categories → concerns → treatments_base → packages 순서로 생성

---

## TODO-003: MCP로 초기 데이터 입력

### 📋 작업 개요
- 작업 유형: Database

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-002: 데이터베이스 스키마 생성**
  
  받은 것:
  - 완성된 테이블 구조
  - 외래키 관계 설정
  - Service Role Key

#### 🎯 현재 작업
- **목표**: Product Catalog의 모든 데이터를 Supabase에 입력
  
  입력 자원:
  - 파일:
    - `Product Catalog Specification v1.1.md` - 전체 카탈로그 데이터
    - `algorithm_spec_v1.1.md` 섹션 2 - 카테고리/고민 정의
  
  - MCP 설정:
    - Supabase MCP 프로젝트 URL 설정
    - Service Role Key 설정
  
  산출물:
  - 입력된 데이터:
    - categories: 6개 레코드 (탄력, 볼륨, 주름, 피부결·모공, 색소, 바디)
    - concerns: 30개 레코드 (카테고리별 5개)
    - treatments_base: 약 40개 시술
    - packages: 10개 패키지
    - package_items: 약 30개 관계 데이터

#### 📤 다음 작업에 전달하는 것
- **TODO-004: Next.js 프로젝트 생성**
  
  전달 데이터:
  - 완성된 데이터베이스 (스키마 + 데이터)
  - 카테고리 ID 목록
  - 패키지 코드 목록
  
  주의사항:
  - ⚠️ 가격 데이터는 VAT 포함가로 저장됨
  - ⚠️ concern_tags 배열 형식 확인

### 📚 참조 문서
- Product Catalog Specification v1.1 섹션 3-4 - 시술/패키지 카탈로그
- Algorithm Specification v1.1 섹션 2 - 카테고리/고민 정의
- Technical Specification v1.1 섹션 4 - MCP 데이터 입력

### ✅ 완료 조건
1. [ ] 6개 카테고리 입력 완료
2. [ ] 30개 세부고민 입력 완료  
3. [ ] 40개 시술 정보 입력 완료
4. [ ] 10개 패키지 정보 입력 완료
5. [ ] 패키지-시술 관계 설정 완료

### 🧪 검증 방법
```sql
-- 데이터 수 확인
SELECT 
  (SELECT COUNT(*) FROM categories) as categories_count,
  (SELECT COUNT(*) FROM concerns) as concerns_count,
  (SELECT COUNT(*) FROM treatments_base) as treatments_count,
  (SELECT COUNT(*) FROM packages) as packages_count,
  (SELECT COUNT(*) FROM package_items) as package_items_count;

-- 패키지별 구성 확인
SELECT p.name_ko, COUNT(pi.id) as item_count
FROM packages p
LEFT JOIN package_items pi ON p.id = pi.package_id
GROUP BY p.id, p.name_ko;
```

### ⚠️ 주의사항
- MCP 사용 불가 시 seed.sql 스크립트 사용
- 한글/중국어 인코딩 확인

### 🔄 상태 스냅샷
```yaml
# TODO-003 완료 시점의 프로젝트 상태
database:
  - categories: "6개 카테고리 (탄력, 볼륨 등)"
  - concerns: "30개 세부고민"
  - treatments_base: "40개 시술 데이터"
  - packages: "10개 패키지 (베이직~울트라)"
  - package_items: "패키지별 구성 완료"

environment:
  - NEXT_PUBLIC_SUPABASE_URL: "설정됨"
  - SUPABASE_SERVICE_ROLE_KEY: "설정됨"
```

---

### Phase 2: Next.js 프로젝트 및 기본 API

## TODO-004: Next.js 프로젝트 생성 및 기본 설정

### 📋 작업 개요
- 작업 유형: Setup

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-003: MCP로 초기 데이터 입력**
  
  받은 것:
  - 완성된 데이터베이스 (스키마 + 데이터)
  - 환경변수 설정 (.env.local)

#### 🎯 현재 작업
- **목표**: Next.js 14 프로젝트 생성 및 기본 설정
  
  산출물:
  - Next.js 프로젝트 구조:
    ```
    hanzhengxuan/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── lib/
    │   └── supabase/
    │       ├── client.ts
    │       └── server.ts
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── .env.local
    ```
  
  - 설치된 패키지:
    - Next.js 14, TypeScript, Tailwind CSS
    - @supabase/supabase-js, @supabase/ssr
    - zustand, @tanstack/react-query
    - next-i18next

#### 📤 다음 작업에 전달하는 것
- **TODO-005: Supabase 클라이언트 설정**
  
  전달 내용:
  - 프로젝트 구조 완성
  - TypeScript 설정
  - Tailwind CSS 설정
  - 패키지 설치 완료

### 📚 참조 문서
- Technical Specification v1.1 섹션 1.2 - 기술 스택
- Technical Specification v1.1 섹션 7.1 - 개발 환경 설정

### ✅ 완료 조건
1. [ ] Next.js 14 App Router 프로젝트 생성
2. [ ] 모든 의존성 패키지 설치
3. [ ] TypeScript 설정 완료
4. [ ] Tailwind CSS 설정 완료
5. [ ] 개발 서버 정상 실행

### 🧪 검증 방법
```bash
# 프로젝트 생성
npx create-next-app@latest hanzhengxuan --typescript --tailwind --app --use-pnpm

# 의존성 설치
cd hanzhengxuan
pnpm add @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query next-i18next
pnpm add -D @types/node

# 개발 서버 실행
pnpm dev

# 브라우저에서 확인
# http://localhost:3000
```

### ⚠️ 주의사항
- pnpm 사용 (npm/yarn 대신)
- App Router 사용 (Pages Router X)

---

## TODO-005: Supabase 클라이언트 설정

### 📋 작업 개요
- 작업 유형: Setup

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-004: Next.js 프로젝트 생성**
  
  받은 것:
  - Next.js 프로젝트 구조
  - 환경변수 파일 (.env.local)
  - Supabase 패키지 설치됨

#### 🎯 현재 작업
- **목표**: Supabase 클라이언트 설정 및 연결 테스트
  
  산출물:
  - 새 파일:
    - `lib/supabase/client.ts` - 클라이언트 사이드용
      ```typescript
      export function createClient() {
        return createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
      }
      ```
    
    - `lib/supabase/server.ts` - 서버 사이드용
      ```typescript
      export function createClient() {
        return createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { cookies }
        )
      }
      ```
    
    - `lib/supabase/types.ts` - TypeScript 타입 정의

#### 📤 다음 작업에 전달하는 것
- **TODO-006: 세션 관리 API 구현**
  
  전달 내용:
  - Supabase 클라이언트 함수
  - TypeScript 타입 정의
  - 서버/클라이언트 분리된 접근 방식

### 📚 참조 문서
- Technical Specification v1.1 섹션 3.2 - API 구현
- Technical Specification v1.1 섹션 7 - 배포 프로세스

### ✅ 완료 조건
1. [ ] 클라이언트/서버 Supabase 설정 완료
2. [ ] TypeScript 타입 생성
3. [ ] 연결 테스트 성공

### 🧪 검증 방법
```typescript
// app/test/page.tsx 생성하여 테스트
import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('*')
  
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

### ⚠️ 주의사항
- 서버 컴포넌트에서는 server.ts 사용
- 클라이언트 컴포넌트에서는 client.ts 사용

---

## TODO-006: 세션 관리 API 구현

### 📋 작업 개요
- 작업 유형: API

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-005: Supabase 클라이언트 설정**
  
  받은 것:
  - `lib/supabase/server.ts` - 서버 클라이언트
  - `lib/supabase/types.ts` - TypeScript 타입
  - Supabase 연결 확인됨

#### 🎯 현재 작업
- **목표**: 익명 세션 생성 및 관리 API 구현
  
  산출물:
  - 새 파일:
    - `app/api/v1/sessions/route.ts` - POST 세션 생성
      - export function POST(): 세션 생성
      - 쿠키 설정 (24시간)
      - session_id 반환
    
    - `lib/utils/session.ts` - 세션 유틸리티
      - validateSessionId(): UUID 검증
      - getSessionFromCookie(): 쿠키에서 세션 추출
  
  - API 응답 형식:
    ```json
    {
      "success": true,
      "data": {
        "session_id": "uuid",
        "expires_at": "timestamp"
      }
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-007: 카테고리 조회 API 구현**
  
  전달 내용:
  - 세션 생성 API 엔드포인트: `POST /api/v1/sessions`
  - 세션 검증 유틸리티 함수
  - 쿠키 기반 세션 관리 방식
  
  주의사항:
  - ⚠️ httpOnly 쿠키 사용
  - ⚠️ 24시간 만료 설정

### 📚 참조 문서
- Technical Specification v1.1 섹션 3.2.1 - 세션 생성
- Technical Specification v1.1 섹션 5.2 - 입력값 검증

### ✅ 완료 조건
1. [ ] POST /api/v1/sessions 엔드포인트 작동
2. [ ] 세션 쿠키 설정 확인
3. [ ] 세션 테이블에 레코드 생성
4. [ ] 에러 처리 구현

### 🧪 검증 방법
```bash
# 세션 생성 테스트
curl -X POST http://localhost:3000/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{"language": "zh-CN"}'

# 응답 확인
# Set-Cookie 헤더 확인
# session_id 쿠키 존재 여부
```

### ⚠️ 주의사항
- Rate limiting 미들웨어 적용
- IP 주소 수집 (분석용)

### 🚨 일반적인 문제와 해결
1. **문제**: 쿠키가 설정되지 않음
   - 증상: 브라우저에서 session_id 쿠키 없음
   - 원인: SameSite 설정 문제
   - 해결: sameSite: 'lax' 설정

---

## TODO-007: 카테고리 및 패키지 조회 API 구현

### 📋 작업 개요
- 작업 유형: API

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-006: 세션 관리 API 구현**
  
  받은 것:
  - 세션 검증 유틸리티
  - API 라우트 구조 확립
  - Supabase 서버 클라이언트

#### 🎯 현재 작업
- **목표**: 카테고리와 패키지 데이터 조회 API 구현
  
  산출물:
  - 새 파일:
    - `app/api/v1/categories/route.ts` - GET 카테고리 목록
      - 모든 활성 카테고리 조회
      - 캐시 헤더 설정 (1시간)
    
    - `app/api/v1/packages/route.ts` - GET 패키지 목록
      - 쿼리 파라미터: category, price_tier
      - 패키지 + 구성 시술 조인
    
    - `app/api/v1/packages/[packageCode]/route.ts` - GET 패키지 상세
      - 패키지 코드로 조회
      - 가격 분해 정보 포함
  
  - API 응답 예시:
    ```json
    // GET /api/v1/categories
    {
      "categories": [
        {
          "id": "elasticity",
          "name": "탄력",
          "icon": "🎈",
          "description": "피부 처짐과 탄력 개선"
        }
      ]
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-008: 사용자 입력 저장 API 구현**
  
  전달 내용:
  - 카테고리 조회 API: `GET /api/v1/categories`
  - 패키지 목록 API: `GET /api/v1/packages`
  - 패키지 상세 API: `GET /api/v1/packages/[code]`
  - 캐싱 전략 구현됨

### 📚 참조 문서
- Product Catalog Specification v1.1 섹션 5.1-5.3 - API 연동 가이드
- Technical Specification v1.1 섹션 6.1 - 캐싱 전략

### ✅ 완료 조건
1. [ ] 카테고리 목록 API 작동
2. [ ] 패키지 목록 필터링 작동
3. [ ] 패키지 상세 정보 조회 작동
4. [ ] 캐시 헤더 설정 확인

### 🧪 검증 방법
```bash
# 카테고리 조회
curl http://localhost:3000/api/v1/categories

# 패키지 목록 조회
curl http://localhost:3000/api/v1/packages?category=elasticity

# 패키지 상세 조회
curl http://localhost:3000/api/v1/packages/ELASTICITY_BASIC
```

### ⚠️ 주의사항
- 캐시 설정으로 서버 부하 감소
- 활성 상태(is_active) 필터링

---

## TODO-008: 사용자 입력 저장 및 추천 API 구현

### 📋 작업 개요
- 작업 유형: API

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-007: 카테고리 및 패키지 조회 API**
  
  받은 것:
  - 카테고리/패키지 데이터 구조
  - API 라우트 패턴 확립
  - 세션 검증 방식

#### 🎯 현재 작업
- **목표**: 위자드 입력 저장 및 패키지 추천 API 구현
  
  산출물:
  - 새 파일:
    - `app/api/v1/sessions/[sessionId]/inputs/route.ts` - POST 입력 저장
      - 3단계 입력 데이터 저장
      - 세션 유효성 검증
    
    - `app/api/v1/sessions/[sessionId]/recommendations/route.ts` - POST 추천
      - 간단한 매칭 알고리즘 구현
      - 2-3개 패키지 추천
      - maxDuration: 30초 설정
    
    - `lib/utils/recommendation.ts` - 추천 로직
      - calculateSimpleRecommendations(): 매칭 점수 계산
      - filterByPriceTier(): 가격대 다양성 보장
  
  - 추천 응답 형식:
    ```json
    {
      "success": true,
      "data": {
        "recommendations": [
          {
            "package_code": "ELASTICITY_BASIC",
            "match_score": 85,
            "rank_order": 1,
            "reasoning": "고민 3개 해결"
          }
        ]
      }
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-009: 견적서 생성 API 구현**
  
  전달 내용:
  - 사용자 입력 API: `POST /api/v1/sessions/[id]/inputs`
  - 추천 API: `POST /api/v1/sessions/[id]/recommendations`
  - 추천 결과 데이터 구조
  
  주의사항:
  - ⚠️ 추천 알고리즘은 MVP 수준 (간단한 매칭)
  - ⚠️ 30초 타임아웃 설정

### 📚 참조 문서
- Algorithm Specification v1.1 섹션 4 - 매칭 점수 계산
- Technical Specification v1.1 섹션 3.2.2 - 패키지 추천

### ✅ 완료 조건
1. [ ] 사용자 입력 저장 작동
2. [ ] 추천 알고리즘 구현
3. [ ] 2-3개 패키지 추천 반환
4. [ ] 가격대 다양성 보장

### 🧪 검증 방법
```bash
# 사용자 입력 저장
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/inputs \
  -H "Content-Type: application/json" \
  -d '{
    "step_number": 1,
    "selected_concerns": ["cheek_jaw_sagging", "double_chin"]
  }'

# 추천 요청
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/recommendations
```

### ⚠️ 주의사항
- 추천 로직은 나중에 고도화 예정
- 현재는 고민-패키지 매칭만 구현

### 🔄 상태 스냅샷
```yaml
# TODO-008 완료 시점의 프로젝트 상태
api_endpoints:
  - POST /api/v1/sessions: "세션 생성"
  - GET /api/v1/categories: "카테고리 목록"
  - GET /api/v1/packages: "패키지 목록"
  - POST /api/v1/sessions/[id]/inputs: "입력 저장"
  - POST /api/v1/sessions/[id]/recommendations: "추천 생성"

database:
  - user_sessions: "세션 레코드 생성됨"
  - user_inputs: "사용자 입력 저장됨"
  - package_recommendations: "추천 결과 저장됨"
```

---

## TODO-009: 견적서 생성 API 구현

### 📋 작업 개요
- 작업 유형: API

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-008: 사용자 입력 저장 및 추천 API**
  
  받은 것:
  - 추천 결과 데이터 구조
  - 세션별 API 패턴
  - 패키지 정보 조회 방식

#### 🎯 현재 작업
- **목표**: 웹 견적서 생성 및 조회 API 구현
  
  산출물:
  - 새 파일:
    - `app/api/v1/sessions/[sessionId]/quotes/route.ts` - POST 견적서 생성
      - 고유 견적번호 생성 (Q202507010001 형식)
      - 선택 패키지 정보 저장
      - 총액 계산
    
    - `app/api/v1/quotes/[quoteId]/route.ts` - GET 견적서 조회
      - 견적서 정보 반환
      - 유효기간 확인
    
    - `lib/utils/quote.ts` - 견적서 유틸리티
      - generateQuoteId(): 고유번호 생성
      - calculateTotal(): 총액 계산
  
  - 견적서 생성 응답:
    ```json
    {
      "success": true,
      "data": {
        "quote_id": "Q20250701001",
        "quote_url": "/quote/Q20250701001",
        "total_price": 1500000
      }
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-010: 기본 레이아웃 및 글로벌 스타일**
  
  전달 내용:
  - 견적서 생성 API: `POST /api/v1/sessions/[id]/quotes`
  - 견적서 조회 API: `GET /api/v1/quotes/[id]`
  - 견적서 URL 패턴: `/quote/[quoteId]`
  
  주의사항:
  - ⚠️ 견적서는 7일간 유효
  - ⚠️ 견적번호는 고유해야 함

### 📚 참조 문서
- Technical Specification v1.1 섹션 3.2.3 - 견적서 생성
- PRD v1.1 섹션 3.1.3 - 웹페이지 견적서 시스템

### ✅ 완료 조건
1. [ ] 견적서 생성 API 작동
2. [ ] 고유 견적번호 생성
3. [ ] 견적서 조회 API 작동
4. [ ] 만료된 견적서 처리

### 🧪 검증 방법
```bash
# 견적서 생성
curl -X POST http://localhost:3000/api/v1/sessions/[SESSION_ID]/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "selected_packages": ["ELASTICITY_BASIC", "VOLUME_BASIC"],
    "personal_info": {"name": "테스트"}
  }'

# 견적서 조회
curl http://localhost:3000/api/v1/quotes/Q20250701001
```

### ⚠️ 주의사항
- 견적번호 중복 방지 로직 필요
- 개인정보는 최소한만 수집

### 🔄 상태 스냅샷
```yaml
# Phase 2 완료 시점의 프로젝트 상태
api_endpoints:
  - POST /api/v1/sessions: "세션 생성"
  - GET /api/v1/categories: "카테고리 목록"
  - GET /api/v1/packages: "패키지 목록"
  - GET /api/v1/packages/[code]: "패키지 상세"
  - POST /api/v1/sessions/[id]/inputs: "입력 저장"
  - POST /api/v1/sessions/[id]/recommendations: "추천 생성"
  - POST /api/v1/sessions/[id]/quotes: "견적서 생성"
  - GET /api/v1/quotes/[id]: "견적서 조회"

next_phase: "프론트엔드 UI 구현 시작"
```

---

### Phase 3: 프론트엔드 기본 구조

## TODO-010: 기본 레이아웃 및 글로벌 스타일

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-009: 견적서 생성 API 구현**
  
  받은 것:
  - 완성된 백엔드 API
  - Next.js 프로젝트 구조
  - Tailwind CSS 설정

#### 🎯 현재 작업
- **목표**: 기본 레이아웃과 디자인 시스템 구축
  
  산출물:
  - 수정 파일:
    - `app/layout.tsx` - RootLayout 구성
      - 폰트 설정 (Noto Sans KR/SC)
      - 메타데이터 설정
      - Vercel Analytics 추가
    
    - `app/globals.css` - 글로벌 스타일
      - CSS 변수 정의 (컬러, 간격)
      - Tailwind 확장 설정
      - 기본 리셋 스타일
    
    - `tailwind.config.ts` - Tailwind 설정
      - 커스텀 컬러 추가
      - 폰트 설정
      - 컨테이너 설정
  
  - 컬러 시스템:
    ```css
    --primary-mint: #3DD5C4;
    --tier-basic: #3DD5C4;
    --tier-premium: #667EEA;
    --tier-luxury: #FFD700;
    --tier-ultra: #2C3E50;
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-011: 공통 컴포넌트 시스템 구축**
  
  전달 내용:
  - 완성된 레이아웃 구조
  - 디자인 토큰 (컬러, 폰트, 간격)
  - Tailwind 커스텀 클래스
  
  사용 예시:
  - `className="text-primary-mint"`
  - `className="bg-tier-basic"`

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 6.1 - 컬러 팔레트
- UI/UX Specification v1.1 섹션 6.2 - 타이포그래피

### ✅ 완료 조건
1. [ ] 폰트 로딩 확인 (한글/중국어)
2. [ ] 컬러 변수 적용 확인
3. [ ] 모바일 우선 레이아웃 확인
4. [ ] Analytics 스크립트 추가

### 🧪 검증 방법
```bash
# 개발 서버 실행
pnpm dev

# 브라우저에서 확인
# - 폰트 적용 여부
# - 모바일 뷰 (420px)
# - 컬러 변수 사용
```

### ⚠️ 주의사항
- 중국에서 접속 가능한 폰트 사용
- 모바일 최적화 우선

---

## TODO-011: 공통 컴포넌트 시스템 구축

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-010: 기본 레이아웃 및 글로벌 스타일**
  
  받은 것:
  - 디자인 토큰 (컬러, 폰트)
  - Tailwind 설정
  - 글로벌 스타일

#### 🎯 현재 작업
- **목표**: 재사용 가능한 UI 컴포넌트 구축
  
  산출물:
  - 새 파일:
    - `components/ui/Button.tsx` - 버튼 컴포넌트
      - variant: primary, secondary, text
      - size: lg, md, sm
      - loading 상태
    
    - `components/ui/Card.tsx` - 카드 컴포넌트
      - hoverable, selected 속성
      - onClick 핸들러
    
    - `components/ui/Modal.tsx` - 모달 컴포넌트
      - position: center, bottom
      - 백드롭 클릭 닫기
    
    - `components/ui/BottomSheet.tsx` - 바텀시트
      - 드래그 제스처
      - height: auto, full
    
    - `components/ui/Progress.tsx` - 프로그레스
      - ProgressDots: 단계 표시
      - ProgressBar: 진행률 표시
    
    - `components/ui/Input.tsx` - 입력 컴포넌트
      - Checkbox, Radio
      - Slider (1-5)

#### 📤 다음 작업에 전달하는 것
- **TODO-012: Zustand 상태 관리 설정**
  
  전달 내용:
  - UI 컴포넌트 라이브러리
  - 컴포넌트 사용 예시
  - TypeScript 타입 정의
  
  사용 예시:
  ```tsx
  <Button variant="primary" size="lg" onClick={handleClick}>
    다음
  </Button>
  ```

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 4.1 - 기본 컴포넌트

### ✅ 완료 조건
1. [ ] 모든 기본 컴포넌트 구현
2. [ ] TypeScript 타입 완성
3. [ ] 접근성 속성 추가
4. [ ] 모바일 터치 최적화

### 🧪 검증 방법
```typescript
// components/test/ComponentTest.tsx
export default function ComponentTest() {
  return (
    <div className="p-4 space-y-4">
      <Button variant="primary">테스트 버튼</Button>
      <Card hoverable>카드 컴포넌트</Card>
      <Checkbox>체크박스</Checkbox>
    </div>
  );
}
```

### ⚠️ 주의사항
- 최소 터치 영역 48x48px
- 다크모드는 MVP에서 제외

---

## TODO-012: Zustand 상태 관리 설정

### 📋 작업 개요
- 작업 유형: Setup

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-011: 공통 컴포넌트 시스템 구축**
  
  받은 것:
  - UI 컴포넌트들
  - TypeScript 환경
  - 프로젝트 구조

#### 🎯 현재 작업
- **목표**: 전역 상태 관리 스토어 구축
  
  산출물:
  - 새 파일:
    - `store/useAppStore.ts` - Zustand 스토어
      ```typescript
      interface AppState {
        // 세션
        sessionId: string;
        
        // 위자드 데이터
        selectedCategories: string[];
        selectedConcerns: Concern[];
        personalFactors: PersonalFactor[];
        
        // 추천 결과
        recommendations: Package[];
        
        // 관심 패키지
        interestedPackages: string[];
        
        // 액션
        setSessionId: (id: string) => void;
        addCategory: (category: string) => void;
        removeCategory: (category: string) => void;
        addInterest: (packageId: string) => void;
        removeInterest: (packageId: string) => void;
        resetWizard: () => void;
      }
      ```
    
    - `store/types.ts` - 타입 정의
      - Concern, Package, PersonalFactor 등
    
    - `hooks/useSession.ts` - 세션 관리 훅
      - 세션 초기화
      - 세션 유효성 체크

#### 📤 다음 작업에 전달하는 것
- **TODO-013: React Query 설정 및 API 훅**
  
  전달 내용:
  - 전역 상태 관리 시스템
  - 타입 정의
  - 상태 액션 함수들
  
  사용 예시:
  ```tsx
  const { sessionId, addCategory } = useAppStore();
  ```

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 5.1 - 전역 상태
- Technical Specification v1.1 섹션 1.2 - 기술 스택

### ✅ 완료 조건
1. [ ] Zustand 스토어 생성
2. [ ] 모든 상태 타입 정의
3. [ ] persist 미들웨어 설정
4. [ ] 개발자 도구 연동

### 🧪 검증 방법
```typescript
// app/test/store-test/page.tsx
'use client'
import { useAppStore } from '@/store/useAppStore'

export default function StoreTest() {
  const { selectedCategories, addCategory } = useAppStore()
  
  return (
    <div>
      <button onClick={() => addCategory('elasticity')}>
        카테고리 추가
      </button>
      <pre>{JSON.stringify(selectedCategories)}</pre>
    </div>
  )
}
```

### ⚠️ 주의사항
- localStorage는 클라이언트 컴포넌트에서만
- 서버 컴포넌트에서는 사용 불가

---

## TODO-013: React Query 설정 및 API 훅

### 📋 작업 개요
- 작업 유형: Setup

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-012: Zustand 상태 관리 설정**
  
  받은 것:
  - 전역 상태 관리 시스템
  - 타입 정의
  - sessionId 관리 방식

#### 🎯 현재 작업
- **목표**: API 통신을 위한 React Query 설정 및 커스텀 훅 구현
  
  산출물:
  - 새 파일:
    - `lib/queryClient.ts` - QueryClient 설정
      - 기본 옵션 설정
      - 에러 핸들링
    
    - `app/providers.tsx` - Provider 래퍼
      - QueryClientProvider
      - 하이드레이션 설정
    
    - `hooks/api/useCategories.ts` - 카테고리 조회
      ```typescript
      export function useCategories() {
        return useQuery({
          queryKey: ['categories'],
          queryFn: fetchCategories,
          staleTime: 60 * 60 * 1000, // 1시간
        })
      }
      ```
    
    - `hooks/api/usePackages.ts` - 패키지 조회
    - `hooks/api/useRecommendations.ts` - 추천 요청
    - `hooks/api/useQuote.ts` - 견적서 생성
    
    - `lib/api/client.ts` - API 클라이언트
      - fetch 래퍼
      - 에러 처리
      - 타입 안전성

#### 📤 다음 작업에 전달하는 것
- **TODO-014: 랜딩 페이지 구현**
  
  전달 내용:
  - API 훅 라이브러리
  - 데이터 페칭 패턴
  - 로딩/에러 상태 처리
  
  사용 예시:
  ```tsx
  const { data: categories, isLoading } = useCategories()
  ```

### 📚 참조 문서
- Technical Specification v1.1 섹션 3 - API 설계
- UI/UX Specification v1.1 섹션 8 - API 연동

### ✅ 완료 조건
1. [ ] QueryClient 설정 완료
2. [ ] Provider 래핑 완료
3. [ ] 모든 API 훅 구현
4. [ ] 타입 안전성 확보

### 🧪 검증 방법
```typescript
// app/test/api-test/page.tsx
'use client'
import { useCategories } from '@/hooks/api/useCategories'

export default function ApiTest() {
  const { data, isLoading, error } = useCategories()
  
  if (isLoading) return <div>로딩중...</div>
  if (error) return <div>에러: {error.message}</div>
  
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
```

### ⚠️ 주의사항
- 클라이언트 컴포넌트에서만 사용
- 서버 컴포넌트는 직접 fetch 사용

### 🔄 상태 스냅샷
```yaml
# Phase 3 완료 시점의 프로젝트 상태
frontend_structure:
  - layout: "기본 레이아웃 완성"
  - components: "UI 컴포넌트 라이브러리"
  - state: "Zustand 전역 상태"
  - api: "React Query 훅"

ready_for: "페이지 구현 시작"
```

---

### Phase 4: 핵심 기능 구현

## TODO-014: 랜딩 페이지 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-013: React Query 설정 및 API 훅**
  
  받은 것:
  - UI 컴포넌트 라이브러리
  - 전역 상태 관리
  - API 훅 (useSession 등)

#### 🎯 현재 작업
- **목표**: 서비스 진입점인 랜딩 페이지 구현
  
  산출물:
  - 수정 파일:
    - `app/page.tsx` - 랜딩 페이지
      - 히어로 섹션
      - 신뢰 배지 (10% 할인, 중국어 상담)
      - 서비스 특징 그리드
      - CTA 버튼 (하단 고정)
    
    - `components/landing/HeroSection.tsx`
      - 메인 카피: "언니가 직접 다녀온..."
      - 서브 카피
      - 애니메이션
    
    - `components/landing/TrustBadges.tsx`
      - 3개 배지 컴포넌트
    
    - `components/landing/ServiceFeatures.tsx`
      - 2x2 그리드
      - 아이콘 + 설명
  
  - 인터랙션:
    - CTA 클릭 → 세션 생성 → /wizard/step1 이동
    - 스크롤 시 CTA 고정

#### 📤 다음 작업에 전달하는 것
- **TODO-015: 3단계 위자드 - Step 1 구현**
  
  전달 내용:
  - 세션 생성 플로우
  - 라우팅 패턴 (/wizard/step1)
  - 페이지 전환 애니메이션
  
  주의사항:
  - ⚠️ 세션 생성 실패 시 에러 처리
  - ⚠️ 중복 클릭 방지

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.1 - 랜딩 페이지
- PRD v1.1 섹션 1.2 - 핵심 가치 제안

### ✅ 완료 조건
1. [ ] 히어로 섹션 완성
2. [ ] CTA 버튼 동작
3. [ ] 반응형 디자인
4. [ ] 세션 생성 연동

### 🧪 검증 방법
```bash
# 랜딩 페이지 확인
http://localhost:3000

# CTA 클릭 테스트
# - 세션 생성 확인 (개발자 도구)
# - /wizard/step1로 이동 확인
```

### ⚠️ 주의사항
- 모바일 우선 디자인
- 중국어 텍스트 준비

---

## TODO-015: 3단계 위자드 - Step 1 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-014: 랜딩 페이지 구현**
  
  받은 것:
  - 세션 ID (쿠키/상태)
  - 라우팅 패턴
  - UI 컴포넌트

#### 🎯 현재 작업
- **목표**: 카테고리 선택 화면 구현
  
  산출물:
  - 새 파일:
    - `app/wizard/step1/page.tsx` - Step 1 페이지
      - 헤더 (뒤로가기, 단계표시)
      - 질문: "어떤 고민이 있어?"
      - 카테고리 카드 6개
      - 하단 다음 버튼
    
    - `components/wizard/WizardHeader.tsx`
      - 뒤로가기 버튼
      - ProgressDots (1/3)
    
    - `components/wizard/CategoryCard.tsx`
      - 아이콘 + 이름
      - 선택 상태
      - 클릭 애니메이션
    
    - `components/wizard/WizardFooter.tsx`
      - 다음 버튼
      - 비활성/활성 상태
  
  - 상태 관리:
    - selectedCategories 배열 (최대 3개)
    - Zustand 스토어 연동

#### 📤 다음 작업에 전달하는 것
- **TODO-016: 3단계 위자드 - Step 2 구현**
  
  전달 내용:
  - 선택된 카테고리 ID 배열
  - 위자드 컴포넌트 구조
  - 다음 단계 라우팅 (/wizard/step2)
  
  전달 데이터:
  ```typescript
  selectedCategories: ['elasticity', 'volume']
  ```

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.2 - Step 1
- Algorithm Specification v1.1 섹션 2.1 - 카테고리 구조

### ✅ 완료 조건
1. [ ] 6개 카테고리 표시
2. [ ] 복수 선택 가능 (최대 3개)
3. [ ] 선택 시 상태 업데이트
4. [ ] 다음 버튼 활성화 로직

### 🧪 검증 방법
```bash
# Step 1 페이지 접속
http://localhost:3000/wizard/step1

# 테스트 시나리오
1. 카테고리 클릭 → 선택 상태 확인
2. 3개 초과 선택 시도 → 제한 확인
3. 다음 버튼 클릭 → step2로 이동
```

### ⚠️ 주의사항
- 최대 3개 카테고리 선택 제한
- 뒤로가기 시 상태 유지

---

## TODO-016: 3단계 위자드 - Step 2 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-015: 3단계 위자드 - Step 1 구현**
  
  받은 것:
  - 선택된 카테고리 ID 배열
  - 위자드 헤더/푸터 컴포넌트
  - 진행 상태 관리 패턴

#### 🎯 현재 작업
- **목표**: 세부 고민 선택 화면 구현
  
  산출물:
  - 새 파일:
    - `app/wizard/step2/page.tsx` - Step 2 페이지
      - 선택한 카테고리별 섹션
      - 카테고리당 5개 고민 표시
      - 체크박스 리스트
    
    - `components/wizard/ConcernSection.tsx`
      - 카테고리 헤더
      - 고민 리스트
    
    - `components/wizard/ConcernItem.tsx`
      - 체크박스 + 라벨
      - 심각도 슬라이더 (선택)
    
    - `hooks/api/useConcerns.ts`
      - 카테고리별 고민 조회
  
  - 데이터 구조:
    ```typescript
    selectedConcerns: [{
      id: 'cheek_jaw_sagging',
      category: 'elasticity',
      severity: 3
    }]
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-017: 3단계 위자드 - Step 3 구현**
  
  전달 내용:
  - 선택된 고민 배열
  - 심각도 정보
  - 다음 단계 라우팅 (/wizard/step3)
  
  주의사항:
  - ⚠️ 최소 1개 고민 선택 필수
  - ⚠️ 카테고리 없으면 step1로 리다이렉트

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.2 - Step 2
- Algorithm Specification v1.1 섹션 2.2 - 세부고민 매핑

### ✅ 완료 조건
1. [ ] 선택 카테고리별 고민 표시
2. [ ] 체크박스 선택 기능
3. [ ] 심각도 슬라이더 (선택)
4. [ ] 상태 저장 및 전달

### 🧪 검증 방법
```bash
# Step 2 직접 접속 시 리다이렉트 확인
http://localhost:3000/wizard/step2

# 정상 플로우
1. Step 1에서 카테고리 선택
2. Step 2에서 고민 표시 확인
3. 고민 선택 후 다음 진행
```

### ⚠️ 주의사항
- 선택 카테고리가 없으면 step1로
- 뒤로가기 시 선택 상태 유지

---

## TODO-017: 3단계 위자드 - Step 3 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-016: 3단계 위자드 - Step 2 구현**
  
  받은 것:
  - 선택된 고민 배열
  - 위자드 진행 상태
  - 체크박스 컴포넌트

#### 🎯 현재 작업
- **목표**: 개인 상황 선택 및 추천 요청
  
  산출물:
  - 새 파일:
    - `app/wizard/step3/page.tsx` - Step 3 페이지
      - 개인 상황 체크리스트
      - 완료 메시지
      - 추천 생성 요청
    
    - `components/wizard/PersonalFactorItem.tsx`
      - 체크박스 + 설명
      - 아이콘 표시
    
    - `components/wizard/CompletionAnimation.tsx`
      - 완료 애니메이션
      - 로딩 전환
  
  - 개인 상황 옵션:
    - 가격 부담 최소화
    - 하루 완성 선호
    - 즉각 효과 원함
    - 장기 지속 원함
    - 짧은 회복기간

#### 📤 다음 작업에 전달하는 것
- **TODO-018: 로딩 화면 구현**
  
  전달 내용:
  - 완성된 사용자 입력 데이터
  - 추천 요청 트리거
  - 로딩 화면으로 전환
  
  API 호출:
  - POST /api/v1/sessions/[id]/inputs (3단계 데이터)
  - POST /api/v1/sessions/[id]/recommendations

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.2 - Step 3
- Algorithm Specification v1.1 섹션 4.2 - 개인 요소

### ✅ 완료 조건
1. [ ] 개인 상황 선택 UI
2. [ ] 입력 데이터 저장 API 호출
3. [ ] 추천 요청 API 호출
4. [ ] 로딩 화면 전환

### 🧪 검증 방법
```bash
# Step 3 완료 시나리오
1. 개인 상황 선택
2. 완료 버튼 클릭
3. API 호출 확인 (Network 탭)
4. 로딩 화면 전환 확인
```

### ⚠️ 주의사항
- API 호출 실패 시 에러 처리
- 중복 제출 방지

---

## TODO-018: 로딩 화면 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-017: 3단계 위자드 - Step 3 구현**
  
  받은 것:
  - 추천 요청 상태
  - 로딩 화면 전환 트리거
  - useRecommendations 훅

#### 🎯 현재 작업
- **목표**: AI 추천 계산 중 로딩 화면
  
  산출물:
  - 새 파일:
    - `app/loading/page.tsx` - 로딩 페이지
      - 로고 펄스 애니메이션
      - 4단계 프로세스 표시
      - 진행률 바
      - 순환 메시지
    
    - `components/loading/ProcessSteps.tsx`
      - 4단계 진행 상태
      - 체크마크 애니메이션
    
    - `components/loading/LoadingMessages.tsx`
      - 3초마다 메시지 변경
      - 페이드 전환
    
    - `hooks/useLoadingProgress.ts`
      - 가상 진행률 관리
      - 실제 API 상태 연동
  
  - 4단계 프로세스:
    1. 고민 분석 완료 ✓
    2. 패키지 매칭 중...
    3. 가격 최적화
    4. 최종 추천 준비

#### 📤 다음 작업에 전달하는 것
- **TODO-019: 패키지 추천 결과 화면**
  
  전달 내용:
  - 추천 결과 데이터
  - 로딩 완료 상태
  - 결과 페이지 전환 (/recommendations)
  
  주의사항:
  - ⚠️ 최소 2초 로딩 시간 보장
  - ⚠️ API 실패 시 에러 페이지

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.3 - 로딩 화면

### ✅ 완료 조건
1. [ ] 로고 애니메이션
2. [ ] 4단계 프로세스 UI
3. [ ] 진행률 표시
4. [ ] API 완료 시 자동 전환

### 🧪 검증 방법
```typescript
// 로딩 화면 테스트
// 1. Step 3 완료
// 2. 로딩 화면 표시 확인
// 3. 각 단계 전환 확인
// 4. 결과 페이지 이동 확인
```

### ⚠️ 주의사항
- 너무 빠른 전환 방지
- 에러 상태 처리

---

## TODO-019: 패키지 추천 결과 화면

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-018: 로딩 화면 구현**
  
  받은 것:
  - 추천 결과 데이터 (2-3개 패키지)
  - 매칭 점수 정보
  - 사용자 선택 이력

#### 🎯 현재 작업
- **목표**: 맞춤 패키지 추천 결과 표시
  
  산출물:
  - 새 파일:
    - `app/recommendations/page.tsx` - 결과 페이지
      - 결과 헤더
      - 가격대 필터
      - 패키지 카드 목록
      - FAB 견적받기 버튼
    
    - `components/package/PackageCard.tsx`
      - 티어 색상 바
      - 매칭률 배지
      - 패키지 정보
      - 액션 버튼
    
    - `components/package/PriceTierFilter.tsx`
      - 가격대 필터 칩
      - 전체/베이직/프리미엄/럭셔리
    
    - `components/package/InterestFAB.tsx`
      - 플로팅 액션 버튼
      - 관심 개수 표시
  
  - 패키지 카드 데이터:
    ```typescript
    {
      tier: 'basic',
      matchScore: 85,
      name: '원데이 미니 리프팅',
      price: 439560,
      highlights: ['즉시 V라인', '회복기간 없음']
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-020: 패키지 상세 모달 구현**
  
  전달 내용:
  - 선택된 패키지 정보
  - 모달 오픈 트리거
  - 관심 패키지 목록
  
  인터랙션:
  - "자세히 보기" → 패키지 상세 모달
  - "관심 추가" → 상태 업데이트

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.4 - 추천 결과
- Algorithm Specification v1.1 섹션 4.3 - 다양성 보장

### ✅ 완료 조건
1. [ ] 2-3개 패키지 표시
2. [ ] 매칭률 표시
3. [ ] 필터 기능
4. [ ] 관심 추가/제거

### 🧪 검증 방법
```bash
# 추천 결과 확인
1. 전체 플로우 완료 후 결과 확인
2. 패키지 카드 인터랙션
3. 필터 동작 확인
4. FAB 버튼 표시
```

### ⚠️ 주의사항
- 빈 결과 처리
- 가격 포맷팅 (천단위 콤마)

### 🔄 상태 스냅샷
```yaml
# TODO-019 완료 시점의 프로젝트 상태
user_flow:
  - landing: "완료"
  - wizard_step1: "완료"
  - wizard_step2: "완료"
  - wizard_step3: "완료"  
  - loading: "완료"
  - recommendations: "완료"

next: "패키지 상세 정보"
```

---

## TODO-020: 패키지 상세 모달 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-019: 패키지 추천 결과 화면**
  
  받은 것:
  - 패키지 선택 이벤트
  - Modal 컴포넌트
  - 패키지 데이터 구조

#### 🎯 현재 작업
- **목표**: 패키지 구성과 상세 정보 모달
  
  산출물:
  - 새 파일:
    - `components/package/PackageDetailModal.tsx`
      - 모달 헤더 (패키지명, 닫기)
      - 가격 섹션
      - 시술 타임라인
      - 담당 의료진
      - 예상 효과
    
    - `components/package/PriceBreakdown.tsx`
      - 시술별 정가
      - 패키지 할인
      - VAT
      - 최종가
    
    - `components/package/TreatmentTimeline.tsx`
      - 시술 순서
      - 소요 시간
      - 시술명 클릭 가능
    
    - `components/package/DoctorInfo.tsx`
      - 의료진 정보
      - 자격증/경력
  
  - 인터랙션:
    - 시술명 클릭 → 시술 상세 바텀시트
    - 하단 CTA → 관심 추가

#### 📤 다음 작업에 전달하는 것
- **TODO-021: 시술 상세 바텀시트 구현**
  
  전달 내용:
  - 시술 선택 이벤트
  - 바텀시트 오픈 트리거
  - 시술 코드
  
  주의사항:
  - ⚠️ 모달 위에 바텀시트 표시
  - ⚠️ 뒤로가기 시 순서 고려

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.5 - 패키지 상세

### ✅ 완료 조건
1. [ ] 모달 열기/닫기
2. [ ] 가격 분해 표시
3. [ ] 시술 타임라인
4. [ ] 관심 추가 기능

### 🧪 검증 방법
```typescript
// 패키지 상세 모달 테스트
1. 패키지 카드 "자세히 보기" 클릭
2. 모달 표시 확인
3. 시술명 클릭 → 바텀시트
4. 모달 외부 클릭 → 닫기
```

### ⚠️ 주의사항
- 모바일 모달 높이 조정
- 스크롤 가능 영역 설정

---

## TODO-021: 시술 상세 바텀시트 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-020: 패키지 상세 모달 구현**
  
  받은 것:
  - 시술 선택 이벤트
  - BottomSheet 컴포넌트
  - 시술 데이터

#### 🎯 현재 작업
- **목표**: 개별 시술 상세 정보 바텀시트
  
  산출물:
  - 새 파일:
    - `components/treatment/TreatmentBottomSheet.tsx`
      - 드래그 핸들
      - 시술 요약 카드
      - 상세 섹션들
      - 하단 닫기 버튼
    
    - `components/treatment/TreatmentSummary.tsx`
      - 4개 지표 카드
      - 시간/회복기간/가격/효과
    
    - `components/treatment/TreatmentProcess.tsx`
      - 시술 과정 타임라인
      - 단계별 설명
    
    - `components/treatment/TreatmentFAQ.tsx`
      - 접었다 펼치기
      - 자주 묻는 질문
  
  - 섹션 구성:
    - 시술 설명
    - 주요 효과
    - 시술 과정
    - 주의사항
    - FAQ

#### 📤 다음 작업에 전달하는 것
- **TODO-022: 관심 패키지 목록 구현**
  
  전달 내용:
  - 완성된 시술 정보 플로우
  - 바텀시트 닫기 후 상태
  - 사용자 이해도 향상
  
  주의사항:
  - ⚠️ 친근한 어투 사용
  - ⚠️ 의학 용어 쉽게 설명

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.6 - 시술 상세

### ✅ 완료 조건
1. [ ] 바텀시트 열기/닫기
2. [ ] 드래그 제스처
3. [ ] 섹션별 정보 표시
4. [ ] FAQ 접기/펼치기

### 🧪 검증 방법
```typescript
// 시술 상세 테스트
1. 패키지 모달에서 시술명 클릭
2. 바텀시트 표시 확인
3. 드래그로 높이 조절
4. FAQ 클릭 동작 확인
```

### ⚠️ 주의사항
- 모달 위에 표시
- 높이 자동 조절

---

## TODO-022: 관심 패키지 목록 구현

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-021: 시술 상세 바텀시트 구현**
  
  받은 것:
  - 관심 패키지 상태 (Zustand)
  - 패키지 정보 구조
  - 카드 컴포넌트

#### 🎯 현재 작업
- **목표**: 찜한 패키지 비교 및 관리 화면
  
  산출물:
  - 새 파일:
    - `app/interests/page.tsx` - 관심 목록 페이지
      - 헤더 (개수, 전체 삭제)
      - 패키지 카드 목록
      - 가격 총계
      - 하단 액션 버튼
    
    - `components/interest/InterestCard.tsx`
      - 간소화된 패키지 카드
      - 삭제 버튼
      - 가격 정보
    
    - `components/interest/PriceSummary.tsx`
      - 총 가격 계산
      - 할인 금액
    
    - `components/interest/EmptyState.tsx`
      - 빈 상태 UI
      - 추천 보기 버튼
  
  - 기능:
    - 개별/전체 삭제
    - 가격 총계 자동 계산
    - 견적받기 이동

#### 📤 다음 작업에 전달하는 것
- **TODO-023: 견적서 생성 화면**
  
  전달 내용:
  - 선택된 패키지 목록
  - 총 가격 정보
  - 견적서 생성 트리거
  
  라우팅:
  - "견적받기" → /quote/create

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.7 - 관심 목록

### ✅ 완료 조건
1. [ ] 관심 패키지 표시
2. [ ] 삭제 기능
3. [ ] 가격 총계
4. [ ] 빈 상태 처리

### 🧪 검증 방법
```bash
# 관심 목록 테스트
1. 패키지 추천에서 관심 추가
2. /interests 접속
3. 패키지 표시 확인
4. 삭제 동작 확인
```

### ⚠️ 주의사항
- 상태 동기화
- 가격 실시간 업데이트

### 🔄 상태 스냅샷
```yaml
# Phase 4 완료 시점의 프로젝트 상태
core_features:
  - landing: "완료"
  - wizard: "3단계 완료"
  - loading: "완료"
  - recommendations: "완료"
  - package_detail: "완료"
  - treatment_detail: "완료"
  - interests: "완료"

ready_for: "견적서 시스템"
```

---

### Phase 5: 견적서 시스템

## TODO-023: 견적서 생성 화면

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-022: 관심 패키지 목록 구현**
  
  받은 것:
  - 선택된 패키지 목록
  - 총 가격 정보
  - 사용자 세션 ID

#### 🎯 현재 작업
- **목표**: 견적서 정보 입력 화면
  
  산출물:
  - 새 파일:
    - `app/quote/create/page.tsx` - 견적서 생성 페이지
      - 선택 패키지 요약
      - 추가 정보 입력
      - 생성 버튼
    
    - `components/quote/PackageSummary.tsx`
      - 선택된 패키지 목록
      - 간단한 정보만 표시
    
    - `components/quote/QuoteForm.tsx`
      - 이름 입력 (선택)
      - 방문 예정일 (선택)
      - 메모 (선택)
    
    - `hooks/useCreateQuote.ts`
      - 견적서 생성 mutation
      - 성공/실패 처리
  
  - API 호출:
    ```typescript
    POST /api/v1/sessions/[id]/quotes
    {
      selected_packages: ['ELASTICITY_BASIC'],
      personal_info: { name: '김철수' }
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-024: 견적서 생성 완료 화면**
  
  전달 내용:
  - 생성된 견적서 ID
  - 견적서 URL
  - 성공 상태
  
  응답 데이터:
  ```json
  {
    "quote_id": "Q20250701001",
    "quote_url": "/quote/Q20250701001"
  }
  ```

### 📚 참조 문서
- Technical Specification v1.1 섹션 3.2.3 - 견적서 생성
- PRD v1.1 섹션 3.1.3 - 견적서 시스템

### ✅ 완료 조건
1. [ ] 패키지 요약 표시
2. [ ] 정보 입력 폼
3. [ ] 견적서 생성 API 호출
4. [ ] 로딩 상태 처리

### 🧪 검증 방법
```bash
# 견적서 생성 테스트
1. 관심 목록에서 "견적받기" 클릭
2. 정보 입력 (선택)
3. 생성 버튼 클릭
4. API 호출 확인
```

### ⚠️ 주의사항
- 개인정보 최소 수집
- 중복 제출 방지

---

## TODO-024: 견적서 생성 완료 화면

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-023: 견적서 생성 화면**
  
  받은 것:
  - 생성된 견적서 ID
  - 견적서 URL
  - 총 가격 정보

#### 🎯 현재 작업
- **목표**: 성공 피드백과 다음 행동 유도
  
  산출물:
  - 새 파일:
    - `app/quote/success/page.tsx` - 성공 페이지
      - 성공 애니메이션
      - 견적서 정보 카드
      - 액션 버튼 3개
    
    - `components/quote/SuccessAnimation.tsx`
      - 체크마크 애니메이션
      - 컨페티 효과
    
    - `components/quote/QuoteInfoCard.tsx`
      - 견적번호
      - 총액
      - 유효기간
    
    - `components/quote/ShareActions.tsx`
      - 견적서 보기
      - 친구에게 공유
      - 중국어 상담
  
  - 공유 기능:
    - 링크 복사
    - WeChat 공유
    - 카카오톡 공유

#### 📤 다음 작업에 전달하는 것
- **TODO-025: 웹 견적서 페이지**
  
  전달 내용:
  - 견적서 URL 라우팅
  - 공유 링크 생성
  - 견적서 조회 준비
  
  액션:
  - "견적서 보기" → /quote/[quoteId]
  - "공유하기" → 링크 복사/SNS

### 📚 참조 문서
- UI/UX Specification v1.1 섹션 3.9 - 견적서 완료

### ✅ 완료 조건
1. [ ] 성공 애니메이션
2. [ ] 견적 정보 표시
3. [ ] 3개 액션 버튼
4. [ ] 공유 기능 구현

### 🧪 검증 방법
```typescript
// 성공 화면 테스트
1. 견적서 생성 완료 후 자동 이동
2. 애니메이션 표시 확인
3. 견적서 보기 클릭 → 웹 견적서
4. 공유 버튼 동작 확인
```

### ⚠️ 주의사항
- 애니메이션 성능
- 공유 API 호환성

---

## TODO-025: 웹 견적서 페이지

### 📋 작업 개요
- 작업 유형: UI

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-024: 견적서 생성 완료 화면**
  
  받은 것:
  - 견적서 ID
  - 견적서 조회 API
  - 공유 URL

#### 🎯 현재 작업
- **목표**: 공유 가능한 정적 견적서 페이지
  
  산출물:
  - 수정 파일:
    - `app/quote/[quoteId]/page.tsx` - 견적서 페이지
      - 서버 컴포넌트
      - 견적서 데이터 조회
      - 정적 렌더링
    
    - `components/quote/QuoteHeader.tsx`
      - 로고, 견적번호
      - 유효기간 표시
    
    - `components/quote/QuotePackages.tsx`
      - 패키지별 상세
      - 가격 정보
    
    - `components/quote/QuoteTotal.tsx`
      - 총액 (원화/위안화)
      - 할인 정보
    
    - `components/quote/QuoteFooter.tsx`
      - 파트너 병원 정보
      - 공유 버튼
      - QR 코드
  
  - 메타데이터:
    ```typescript
    export async function generateMetadata() {
      return {
        title: '韩真选 견적서',
        openGraph: { ... }
      }
    }
    ```

#### 📤 다음 작업에 전달하는 것
- **TODO-026: 성능 최적화 및 테스트**
  
  전달 내용:
  - 완성된 전체 플로우
  - 공유 가능한 견적서
  - E2E 테스트 준비
  
  최종 확인:
  - 견적서 URL 공유 가능
  - 7일 유효기간
  - 모바일 최적화

### 📚 참조 문서
- Technical Specification v1.1 섹션 3.3 - 견적서 페이지
- UI/UX Specification v1.1 섹션 3.10 - 웹 견적서

### ✅ 완료 조건
1. [ ] 견적서 데이터 표시
2. [ ] 원화/위안화 표시
3. [ ] 공유 버튼 작동
4. [ ] 반응형 디자인

### 🧪 검증 방법
```bash
# 견적서 페이지 테스트
1. /quote/Q20250701001 직접 접속
2. 견적서 정보 표시 확인
3. 공유 버튼 테스트
4. 모바일 뷰 확인
```

### ⚠️ 주의사항
- SEO 메타데이터
- 만료된 견적서 처리

### 🔄 상태 스냅샷
```yaml
# Phase 5 완료 시점의 프로젝트 상태
quote_system:
  - create: "완료"
  - success: "완료"
  - web_quote: "완료"

full_flow: "전체 유저플로우 완성"
remaining: "테스트 및 배포"
```

---

### Phase 6: 최종 테스트 및 배포

## TODO-026: 성능 최적화 및 테스트

### 📋 작업 개요
- 작업 유형: Test

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-025: 웹 견적서 페이지**
  
  받은 것:
  - 완성된 전체 애플리케이션
  - 모든 페이지와 기능
  - API 연동 완료

#### 🎯 현재 작업
- **목표**: 성능 최적화 및 종합 테스트
  
  작업 내용:
  - 성능 최적화:
    - 이미지 최적화 (WebP)
    - 번들 사이즈 분석
    - 코드 스플리팅
    - API 응답 캐싱
  
  - E2E 테스트:
    - 전체 플로우 테스트
    - 엣지 케이스 처리
    - 에러 시나리오
  
  - 크로스 브라우저:
    - Chrome, Safari
    - WeChat 내장 브라우저
    - 모바일 디바이스
  
  - 성능 목표:
    - FCP < 1.5초
    - API 응답 < 2초
    - 번들 < 200KB

#### 📤 다음 작업에 전달하는 것
- **TODO-027: Vercel 프로덕션 배포**
  
  전달 내용:
  - 최적화된 빌드
  - 테스트 완료 보고서
  - 배포 준비 상태
  
  체크리스트:
  - ✅ 성능 지표 달성
  - ✅ 버그 수정 완료
  - ✅ 환경변수 준비

### 📚 참조 문서
- Technical Specification v1.1 섹션 10.2 - 성능 목표
- PRD v1.1 섹션 5.2.2 - 기술 성능 지표

### ✅ 완료 조건
1. [ ] Lighthouse 점수 90+
2. [ ] E2E 테스트 통과
3. [ ] 크로스 브라우저 확인
4. [ ] 성능 지표 달성

### 🧪 검증 방법
```bash
# 빌드 및 분석
pnpm build
pnpm analyze

# Lighthouse 테스트
npx lighthouse http://localhost:3000

# E2E 테스트 (수동)
- 전체 플로우 3회 반복
- 다양한 선택 조합
- 에러 상황 테스트
```

### ⚠️ 주의사항
- 중국 네트워크 고려
- 모바일 성능 우선

---

## TODO-027: Vercel 프로덕션 배포

### 📋 작업 개요
- 작업 유형: Deployment

### 🔗 컨텍스트 체인

#### 📥 이전 작업에서 받는 것
- **TODO-026: 성능 최적화 및 테스트**
  
  받은 것:
  - 최적화된 프로덕션 빌드
  - 테스트 완료
  - 환경변수 목록

#### 🎯 현재 작업
- **목표**: Vercel에 프로덕션 배포
  
  배포 단계:
  1. GitHub 저장소 푸시
  2. Vercel 프로젝트 연결
  3. 환경변수 설정:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY
  
  4. 배포 설정:
     - Region: Seoul (icn1)
     - Node.js: 18.x
     - Framework: Next.js
  
  5. 도메인 설정:
     - 커스텀 도메인 (옵션)
     - SSL 인증서
  
  - vercel.json:
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

#### 📤 다음 작업에 전달하는 것
- **프로젝트 완료**
  
  최종 산출물:
  - 프로덕션 URL: https://hanzhengxuan.vercel.app
  - 관리자 대시보드 접근
  - 모니터링 설정
  
  인수인계:
  - 📝 배포 문서
  - 🔑 접근 권한
  - 📊 Analytics 설정

### 📚 참조 문서
- Technical Specification v1.1 섹션 7.2 - Vercel 배포
- Technical Specification v1.1 섹션 8 - 모니터링

### ✅ 완료 조건
1. [ ] Vercel 배포 성공
2. [ ] 프로덕션 URL 접속 가능
3. [ ] 환경변수 설정 완료
4. [ ] Analytics 작동 확인

### 🧪 검증 방법
```bash
# 프로덕션 확인
1. 배포 URL 접속
2. 전체 플로우 테스트
3. 견적서 공유 테스트
4. Analytics 데이터 확인

# 모니터링
- Vercel Dashboard
- Supabase Dashboard
- Analytics Reports
```

### ⚠️ 주의사항
- 환경변수 보안
- 프로덕션 데이터 백업

### 🚨 일반적인 문제와 해결
1. **문제**: 빌드 실패
   - 증상: Vercel 빌드 에러
   - 원인: 환경변수 누락
   - 해결: 모든 환경변수 확인

2. **문제**: 느린 로딩
   - 증상: 중국에서 접속 시 지연
   - 원인: CDN 최적화 필요
   - 해결: 추후 중국 CDN 고려

### 🔄 최종 상태
```yaml
# 프로젝트 완료 시점
deployment:
  - status: "Production Live"
  - url: "https://hanzhengxuan.vercel.app"
  - region: "Seoul"
  
features:
  - anonymous_sessions: "구현됨"
  - 3_step_wizard: "구현됨"
  - package_recommendations: "구현됨"
  - web_quotes: "구현됨"
  - sharing: "구현됨"

metrics:
  - page_load: "< 3초"
  - api_response: "< 2초"
  - lighthouse: "90+"

next_steps:
  - user_feedback: "수집 시작"
  - a_b_testing: "준비"
  - feature_expansion: "계획"
```

---

## Critical Path 시각화
```
Day 1-2:  [DB 설정] ═══════╗
Day 3-4:           ╚═══[API]═══════╗
Day 5-7:                    ╚═══[UI 기초]═══════╗
Day 8-10:                                ╚═══[핵심 기능]═══╗
Day 11-12:                                          ╚═══[견적서]═══╗
Day 13-14:                                                   ╚═══[배포]
```

## 병렬 작업 가능 그룹
- **Group A**: TODO-001~003 (DB 설정)
- **Group B**: TODO-004~009 (API 개발) - A 완료 후
- **Group C**: TODO-010~013 (UI 기초) - B와 병렬 가능
- **Group D**: TODO-014~022 (핵심 기능) - B,C 완료 후
- **Group E**: TODO-023~025 (견적서) - D 완료 후
- **Group F**: TODO-026~027 (테스트/배포) - 모든 작업 완료 후

## 전체 예상 일정
- **총 소요 기간**: 14일 (2주)
- **핵심 마일스톤**:
  - Day 2: 데이터베이스 완성
  - Day 4: API 완성
  - Day 7: UI 기초 완성
  - Day 10: 핵심 기능 완성
  - Day 12: 견적서 시스템 완성
  - Day 14: 프로덕션 배포
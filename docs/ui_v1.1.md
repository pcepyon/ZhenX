## 韩真选 UI/UX 명세서 v2.0 - 유저플로우 기반

### 문서 개요
- **버전**: 2.0
- **목적**: AI Agent를 통한 프론트엔드 개발 가이드
- **대상**: 프론트엔드 개발자, AI 개발 도구
- **기술스택**: Next.js 14, TypeScript, Tailwind CSS, Zustand

---

## 1. 서비스 개요

### 1.1 핵심 가치
- **3분 완성**: 복잡한 의료미용 선택을 3단계로 간소화
- **익명 사용**: 가입 없이 바로 시작 가능한 세션 기반
- **패키지 중심**: 개별 시술이 아닌 큐레이션된 패키지 추천
- **투명한 가격**: 10% 패키지 할인 자동 적용, VAT 포함가 표시

### 1.2 타겟 사용자
- 25-45세 중국인 여성 의료관광객
- 한국어 구사 어려움, 중국어 인터페이스 필수
- 모바일 중심 사용 (WeChat 내장 브라우저)
- 가격 민감하면서도 품질 중시

---

## 2. 전체 유저플로우

### 2.1 메인 플로우
```
[랜딩] → [3단계 위자드] → [추천 결과] → [패키지/시술 상세] → [견적서 생성] → [견적서 공유]
```

### 2.2 상세 화면 구성
1. **랜딩 페이지** - 서비스 진입점
2. **3단계 위자드**
   - Step 1: 카테고리 선택 (6개 중 복수 선택)
   - Step 2: 세부 고민 선택 (카테고리별 5개)
   - Step 3: 개인 상황 체크 (선택사항)
3. **로딩 화면** - AI 추천 계산 중
4. **패키지 추천 결과** - 2-3개 맞춤 패키지
5. **패키지 상세 모달** - 구성 시술, 가격, 의료진
6. **시술 상세 바텀시트** - 시술별 상세 정보
7. **관심 패키지 목록** - 찜한 패키지 관리
8. **견적서 생성** - 정보 입력
9. **견적서 생성 완료** - 성공 상태
10. **웹 견적서 페이지** - 공유용 정적 페이지

---

## 3. 화면별 상세 명세

### 3.1 랜딩 페이지
**목적**: 신뢰 구축과 빠른 시작 유도

**주요 구성요소**:
- 히어로 섹션
  - 메인 카피: "언니가 직접 다녀온 한국 의료미용, 딱 3개만 추천해줄게"
  - 서브 카피: "복잡한 비교 NO! 가입 NO! 3분이면 끝"
  - CTA: "지금 시작하기" (하단 고정)
- 신뢰 배지: 10% 할인, 중국어 상담, 원데이 올킬
- 소셜 증명: 실제 후기 2-3개, 사용자 카운터
- 서비스 특징 그리드 (2x2)

**인터랙션**:
- CTA 클릭 → 세션 생성 → Step 1로 이동
- 스크롤 시 CTA 버튼 하단 고정

### 3.2 3단계 위자드

#### Step 1: 카테고리 선택
**주요 구성요소**:
- 헤더: 뒤로가기, 단계표시(1/3), 프로그레스 도트
- 질문: "어떤 고민이 있어?"
- 카테고리 카드 6개 (2x3 그리드)
  - 탄력 🎈 / 볼륨 💧 / 주름 〰️ / 피부결·모공 ✨ / 색소 🎨 / 바디 💃
- 하단 "다음" 버튼 (선택 시 활성화)

**상태 관리**:
```typescript
interface Step1State {
  selectedCategories: string[]; // 최대 3개
  canProceed: boolean;
}
```

#### Step 2: 세부 고민 선택
**주요 구성요소**:
- 선택한 카테고리별 세부 고민 표시
- 체크박스 리스트 (카테고리당 5개)
- 심각도 슬라이더 (1-5, 선택사항)

**데이터 구조**:
```typescript
interface Concern {
  id: string;
  category: string;
  name: string;
  severity?: number;
}
```

#### Step 3: 개인 상황
**주요 구성요소**:
- 선호도 체크리스트
  - 가격 부담 최소화
  - 하루 완성 선호
  - 즉각 효과 원함
  - 장기 지속 원함
  - 짧은 회복기간
- 완료 메시지 애니메이션

### 3.3 로딩 화면
**목적**: 대기 시간 동안 기대감 조성

**주요 구성요소**:
- 로고 펄스 애니메이션
- 4단계 프로세스 표시
  1. 고민 분석 완료
  2. 패키지 매칭 중
  3. 가격 최적화
  4. 최종 추천 준비
- 진행률 바 (0-100%)
- 순환 메시지 (3초마다 변경)

### 3.4 패키지 추천 결과
**목적**: 맞춤 패키지 2-3개 제시

**주요 구성요소**:
- 결과 헤더: "너를 위한 패키지 3개를 찾았어!"
- 가격대 필터 칩
- 패키지 카드 (세로 스크롤)
  - 티어 색상 바 (basic/premium/luxury/ultra)
  - 매칭률 배지 (예: "85% 일치")
  - 패키지명, 구성, 가격 정보
  - 주요 혜택 3개
  - 액션: "자세히 보기", "관심 추가"
- FAB: "견적받기" (우하단 고정)

**패키지 카드 구조**:
```typescript
interface PackageCard {
  tier: 'basic' | 'premium' | 'luxury' | 'ultra';
  matchScore: number;
  name: string;
  composition: string[];
  pricing: {
    original: number;
    discount: number;
    final: number;
  };
  highlights: string[];
}
```

### 3.5 패키지 상세 모달
**목적**: 패키지 구성과 상세 정보 제공

**주요 구성요소**:
- 모달 헤더: 패키지명, 닫기 버튼
- 가격 섹션: 구성별 가격 분해, 할인 정보
- 시술 타임라인: 순서와 소요시간
- 담당 의료진 정보
- 예상 효과 그리드 (2x2)
- 하단 CTA: "이 패키지 관심있어"

**인터랙션**:
- 시술명 클릭 → 시술 상세 바텀시트
- 모달 외부 클릭 → 닫기

### 3.6 시술 상세 바텀시트
**목적**: 개별 시술 상세 정보 제공

**주요 구성요소**:
- 드래그 핸들
- 시술 요약 카드 (4개 지표)
- 섹션별 정보:
  - 시술 설명 (친근한 어투)
  - 주요 효과 리스트
  - 시술 과정 타임라인
  - 주의사항 (전/후)
  - FAQ (접었다 펼치기)
- 하단 CTA: "이해했어! 닫기"

### 3.7 관심 패키지 목록
**목적**: 찜한 패키지 비교 및 관리

**주요 구성요소**:
- 헤더: 관심 개수 표시, 전체 삭제
- 간소화된 패키지 카드
- 가격 총계 요약
- 하단 CTA: "상세 비교", "견적받기"
- 빈 상태 UI

### 3.8 견적서 생성
**목적**: 견적서 정보 입력

**주요 구성요소**:
- 선택 패키지 요약
- 추가 정보 입력
  - 이름 (선택, 익명 기본)
  - 방문 예정일 (선택)
- 견적서 옵션 체크박스
- 생성 버튼

### 3.9 견적서 생성 완료
**목적**: 성공 피드백과 다음 행동 유도

**주요 구성요소**:
- 성공 애니메이션 (체크마크 + 컨페티)
- 견적서 정보 카드
- 액션 버튼 3개:
  - 견적서 보기
  - 친구에게 공유
  - 중국어 상담 시작
- 다음 단계 안내

### 3.10 웹 견적서 페이지
**목적**: 공유 가능한 정적 견적서

**URL**: `/quote/[quoteId]`

**주요 구성요소**:
- 견적서 헤더 (로고, 번호, 유효기간)
- 패키지별 상세 내역
- 가격 총계 (원화/위안화)
- 파트너 병원 정보
- 공유 버튼 (링크복사, WeChat, 카카오톡)
- QR 코드

---

## 4. 컴포넌트 시스템

### 4.1 기본 컴포넌트
```typescript
// 버튼
<Button variant="primary|secondary|text" size="lg|md|sm" />

// 카드
<Card hoverable selected onClick />

// 모달
<Modal open onClose position="center|bottom" />

// 바텀시트
<BottomSheet open onClose height="auto|full" />

// 프로그레스
<ProgressDots steps={3} current={1} />
<ProgressBar value={75} />

// 입력
<Checkbox checked onChange />
<Slider value={3} min={1} max={5} />
```

### 4.2 비즈니스 컴포넌트
```typescript
// 패키지 카드
<PackageCard 
  package={packageData}
  matchScore={85}
  onDetail={() => {}}
  onInterest={() => {}}
/>

// 시술 타임라인
<TreatmentTimeline items={treatments} />

// 가격 분해
<PriceBreakdown 
  original={1000000}
  discount={100000}
  vat={90000}
  final={990000}
/>

// 견적서 생성기
<QuoteGenerator 
  packages={selectedPackages}
  onComplete={(quoteId) => {}}
/>
```

---

## 5. 상태 관리 (Zustand)

### 5.1 전역 상태
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
  addInterest: (packageId: string) => void;
  removeInterest: (packageId: string) => void;
  resetWizard: () => void;
}
```

### 5.2 세션 관리
- 진입 시 자동 생성 (24시간 유효)
- localStorage에 sessionId 저장
- API 호출 시 헤더에 포함

---

## 6. 디자인 시스템

### 6.1 컬러 팔레트
```css
/* Primary */
--primary-mint: #3DD5C4;
--primary-mint-light: #E6FFFA;

/* Secondary */
--secondary-coral: #FF6B6B;
--secondary-purple: #667EEA;

/* Semantic */
--success: #27AE60;
--error: #E74C3C;
--warning: #F39C12;

/* Tier Colors */
--tier-basic: #3DD5C4;
--tier-premium: #667EEA;
--tier-luxury: #FFD700;
--tier-ultra: #2C3E50;
```

### 6.2 타이포그래피
- 폰트: Noto Sans KR (한글), Noto Sans SC (중국어)
- 크기: 12px ~ 32px
- 굵기: 400(Regular), 600(SemiBold), 700(Bold)

### 6.3 레이아웃
- 모바일 우선: max-width 420px
- 패딩: 20px (기본), 16px (컴팩트)
- 카드 radius: 16px (대), 12px (중), 8px (소)

---

## 7. 인터랙션 가이드

### 7.1 애니메이션
- 페이지 전환: 우측 슬라이드 (300ms)
- 카드 호버: translateY(-2px) + 그림자
- 로딩: 스켈레톤 또는 스피너
- 성공: 스케일 + 페이드인

### 7.2 터치 최적화
- 최소 터치 영역: 48x48px
- 스와이프 제스처 지원
- 햅틱 피드백 고려

---

## 8. API 연동

### 8.1 주요 엔드포인트
```typescript
POST /api/v1/sessions
POST /api/v1/sessions/{id}/inputs
POST /api/v1/sessions/{id}/recommendations
GET  /api/v1/packages/{code}
POST /api/v1/sessions/{id}/quotes
GET  /api/v1/quotes/{id}
```

### 8.2 에러 처리
- 네트워크 오류: 토스트 메시지 + 재시도
- 빈 결과: 친근한 빈 상태 UI
- 서버 오류: 사용자 친화적 메시지

---

## 9. 성능 최적화

### 9.1 이미지
- WebP 포맷 사용
- 레이지 로딩
- 플레이스홀더 제공

### 9.2 코드 스플리팅
- 라우트별 번들 분리
- 모달/바텀시트 동적 임포트

### 9.3 캐싱
- 정적 데이터: 24시간
- 사용자 데이터: 세션 기반

---

## 10. 접근성

### 10.1 기본 요구사항
- WCAG 2.1 AA 준수
- 키보드 네비게이션
- 스크린 리더 지원
- 충분한 색상 대비

### 10.2 다국어
- 기본: 한국어
- 필수: 중국어 간체
- 숫자: 원화/위안화 병기

---

## 11. 배포 체크리스트

### 11.1 개발 완료 기준
- [ ] 모든 화면 구현 완료
- [ ] 반응형 디자인 검증
- [ ] API 연동 및 에러 처리
- [ ] 성능 지표 달성 (FCP < 1.5s)
- [ ] 접근성 검사 통과

### 11.2 테스트
- [ ] 유저플로우 E2E 테스트
- [ ] 크로스 브라우저 (Safari, Chrome)
- [ ] WeChat 내장 브라우저
- [ ] 네트워크 환경 (3G/4G)

---

이 명세서를 기반으로 AI Agent가 각 화면과 컴포넌트를 구현할 수 있습니다. 추가 질문이나 특정 부분의 상세 명세가 필요하면 요청해주세요.
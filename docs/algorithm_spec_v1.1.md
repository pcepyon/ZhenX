# 韩真选 Algorithm Specification v1.1

**문서 버전**: 1.1  
**생성 일시**: 2025년 7월 1일  
**대상 독자**: 백엔드 개발자, 데이터 사이언티스트, AI 엔지니어  
**문서 범위**: 패키지 추천 알고리즘 로직, 매칭 점수 계산, 패키지-고민 매핑 규칙  
**주요 변경**: 인증 제거, session_id 기반 추적, Supabase 통합, Vercel Edge 캐싱

---

## 1. 알고리즘 개요

### 1.1 추천 시스템 목표
- **정확성**: 사용자 고민에 가장 적합한 패키지 추천
- **다양성**: 가격대별 패키지 균형있게 제시  
- **안전성**: 개인 상황을 고려한 패키지 필터링
- **설명가능성**: 추천 이유를 명확히 제시

### 1.2 추천 프로세스 개요
```
사용자 입력 → 패키지 후보 필터링 → 고민-패키지 매칭 → 가격대 가중치 → 다양성 보장 → 최종 추천
     ↓              ↓                ↓              ↓              ↓            ↓
  3단계 위자드    카테고리 매칭     효과점수 계산    예산 고려      중복 제거     2-3개 선정
```

---

## 2. 카테고리 및 고민 정의

### 2.1 대카테고리 구조 (확정)
```yaml
categories:
  elasticity:
    id: "elasticity"
    name: "탄력"
    description: "피부 처짐과 형태 변화 관련"
    
  volume:
    id: "volume" 
    name: "볼륨"
    description: "콜라겐 감소와 볼륨 소실 관련"
    
  wrinkles:
    id: "wrinkles"
    name: "주름"
    description: "피부 노화 및 표정 주름 관련"
    
  skin_texture:
    id: "skin_texture"
    name: "피부결·모공"
    description: "피부 표면 결 손상과 모공 확장"
    
  pigmentation:
    id: "pigmentation"
    name: "색소"
    description: "멜라닌 과다 및 색소 침착 문제"
    
  body:
    id: "body"
    name: "바디"
    description: "신체 부위별 지방·탄력 관련"
```

### 2.2 세부고민 매핑 (확정)

#### 탄력 (Elasticity)
```yaml
elasticity_concerns:
  cheek_jaw_sagging:
    id: "cheek_jaw_sagging"
    name: "볼·턱 처짐"
    weight: 1.0
    
  double_chin:
    id: "double_chin"
    name: "이중턱"
    weight: 1.0
    
  neck_sagging:
    id: "neck_sagging"
    name: "목 처짐"
    weight: 0.9
    
  fine_lines_early:
    id: "fine_lines_early"
    name: "잔주름 및 잔흔"
    weight: 0.8
    
  subcutaneous_fat_sagging:
    id: "subcutaneous_fat_sagging"
    name: "피하지방 처짐"
    weight: 0.9
```

#### 볼륨 (Volume)
```yaml
volume_concerns:
  cheek_hollowing:
    id: "cheek_hollowing"
    name: "볼 꺼짐"
    weight: 1.0
    
  temple_hollowing:
    id: "temple_hollowing"
    name: "관자놀이 꺼짐"
    weight: 0.9
    
  under_eye_hollowing:
    id: "under_eye_hollowing"
    name: "눈 밑 꺼짐"
    weight: 0.8
    
  lip_volume_loss:
    id: "lip_volume_loss"
    name: "입술 볼륨 소실"
    weight: 0.7
    
  body_volume_loss:
    id: "body_volume_loss"
    name: "팔·종아리 빈약함"
    weight: 0.6
```

#### 주름 (Wrinkles)
```yaml
wrinkles_concerns:
  fine_wrinkles:
    id: "fine_wrinkles"
    name: "잔주름(얕은 주름)"
    weight: 0.8
    
  deep_wrinkles:
    id: "deep_wrinkles"
    name: "깊은 주름(팔자주름·미간주름)"
    weight: 1.0
    
  forehead_wrinkles:
    id: "forehead_wrinkles"
    name: "이마 주름"
    weight: 0.9
    
  crow_feet:
    id: "crow_feet"
    name: "눈가 주름(까치발 주름)"
    weight: 0.8
    
  neck_wrinkles:
    id: "neck_wrinkles"
    name: "목 주름"
    weight: 0.7
```

#### 피부결·모공 (Skin Texture)
```yaml
skin_texture_concerns:
  rough_texture:
    id: "rough_texture"
    name: "거친 피부결"
    weight: 0.9
    
  large_pores:
    id: "large_pores"
    name: "넓은 모공"
    weight: 1.0
    
  blackheads_whiteheads:
    id: "blackheads_whiteheads"
    name: "블랙헤드·화이트헤드"
    weight: 0.8
    
  acne_scars:
    id: "acne_scars"
    name: "여드름 흉터·자국"
    weight: 1.0
    
  dull_uneven_tone:
    id: "dull_uneven_tone"
    name: "칙칙함·톤 불균형"
    weight: 0.8
```

#### 색소 (Pigmentation)
```yaml
pigmentation_concerns:
  melasma_freckles:
    id: "melasma_freckles"
    name: "기미·주근깨"
    weight: 1.0
    
  dark_spots:
    id: "dark_spots"
    name: "다크스팟(검은 반점)"
    weight: 1.0
    
  post_acne_pigmentation:
    id: "post_acne_pigmentation"
    name: "여드름 후 색소침착"
    weight: 0.9
    
  rosacea_redness:
    id: "rosacea_redness"
    name: "홍조·혈관성 붉음증"
    weight: 0.8
    
  scar_pigmentation:
    id: "scar_pigmentation"
    name: "흉터 색소"
    weight: 0.7
```

#### 바디 (Body)
```yaml
body_concerns:
  cellulite:
    id: "cellulite"
    name: "셀룰라이트"
    weight: 0.9
    
  localized_fat:
    id: "localized_fat"
    name: "지방 축적(복부·허벅지·팔뚝)"
    weight: 1.0
    
  stretch_marks:
    id: "stretch_marks"
    name: "튼살(스트레치마크)"
    weight: 0.8
    
  body_sagging:
    id: "body_sagging"
    name: "바디 처짐(팔·엉덩이 등)"
    weight: 0.9
    
  body_elasticity_loss:
    id: "body_elasticity_loss"
    name: "바디 탄력 저하"
    weight: 0.8
```

---

## 3. 패키지 데이터베이스

### 3.1 패키지-고민 효과성 매핑

#### 3.1.1 탄력 카테고리 패키지
```yaml
elasticity_packages:
  ELASTICITY_BASIC:
    package_code: "ELASTICITY_BASIC"
    name: "원데이 미니 리프팅"
    price_tier: "basic"
    final_price: 439560  # VAT 포함
    effectiveness:
      cheek_jaw_sagging: 85
      double_chin: 80
      fine_lines_early: 75
      subcutaneous_fat_sagging: 70
    highlight_points: ["즉시 V라인 효과", "회복기간 없음", "1시간 반 시술"]
    
  ELASTICITY_PREMIUM:
    package_code: "ELASTICITY_PREMIUM"
    name: "원데이 V라인 마스터"
    price_tier: "premium"
    final_price: 1503810
    effectiveness:
      cheek_jaw_sagging: 95
      double_chin: 90
      subcutaneous_fat_sagging: 90
      neck_sagging: 85
      fine_lines_early: 80
    highlight_points: ["드라마틱한 리프팅", "지방 감소 동시", "3개월 지속"]
    
  ELASTICITY_LUXURY:
    package_code: "ELASTICITY_LUXURY"
    name: "원데이 토탈 리프팅"
    price_tier: "luxury"
    final_price: 3336300
    effectiveness:
      cheek_jaw_sagging: 98
      neck_sagging: 95
      double_chin: 95
      deep_wrinkles: 85
      subcutaneous_fat_sagging: 90
    highlight_points: ["10년 젊어지는 효과", "목주름까지 개선", "1년 이상 지속"]
    
  ELASTICITY_ULTRA:
    package_code: "ELASTICITY_ULTRA"
    name: "원데이 풀페이스 리뉴얼"
    price_tier: "ultra"
    final_price: 6672600
    effectiveness:
      cheek_jaw_sagging: 100
      neck_sagging: 98
      deep_wrinkles: 95
      fine_wrinkles: 90
      subcutaneous_fat_sagging: 95
    highlight_points: ["최강 안티에이징", "울쎄라+써마지 시너지", "2년 이상 효과"]
```

#### 3.1.2 볼륨 카테고리 패키지
```yaml
volume_packages:
  VOLUME_BASIC:
    package_code: "VOLUME_BASIC"
    name: "원데이 볼륨 부스터"
    price_tier: "basic"
    final_price: 534600
    effectiveness:
      cheek_hollowing: 85
      under_eye_hollowing: 80
      fine_wrinkles: 75
      dull_uneven_tone: 80
    highlight_points: ["자연스러운 볼륨", "수분 동시 보충", "즉각적 효과"]
    
  VOLUME_PREMIUM:
    package_code: "VOLUME_PREMIUM"
    name: "원데이 베이비페이스"
    price_tier: "premium"
    final_price: 1335510
    effectiveness:
      cheek_hollowing: 95
      temple_hollowing: 90
      lip_volume_loss: 85
      under_eye_hollowing: 90
      fine_wrinkles: 85
    highlight_points: ["입체적인 동안 얼굴", "1년 이상 지속", "자연스러운 볼륨감"]
```

#### 3.1.3 주름 카테고리 패키지
```yaml
wrinkle_packages:
  WRINKLE_BASIC:
    package_code: "WRINKLE_BASIC"
    name: "원데이 주름 케어"
    price_tier: "basic"
    final_price: 523710
    effectiveness:
      fine_wrinkles: 90
      forehead_wrinkles: 95
      crow_feet: 90
      under_eye_hollowing: 75
    highlight_points: ["표정주름 개선", "피부결 개선", "눈가 집중 케어"]
```

#### 3.1.4 피부결·모공 카테고리 패키지
```yaml
texture_packages:
  TEXTURE_BASIC:
    package_code: "TEXTURE_BASIC"
    name: "원데이 스킨 리파인"
    price_tier: "basic"
    final_price: 495000
    effectiveness:
      large_pores: 90
      rough_texture: 85
      blackheads_whiteheads: 88
      dull_uneven_tone: 80
    highlight_points: ["즉각적 모공 개선", "매끄러운 피부결", "수분 공급"]
```

#### 3.1.5 색소 카테고리 패키지
```yaml
pigmentation_packages:
  PIGMENT_BASIC:
    package_code: "PIGMENT_BASIC"
    name: "원데이 브라이트닝"
    price_tier: "basic"
    final_price: 414810
    effectiveness:
      melasma_freckles: 88
      dark_spots: 85
      dull_uneven_tone: 90
      post_acne_pigmentation: 82
    highlight_points: ["기미잡티 개선", "피부톤 균일", "즉각적 화이트닝"]
```

#### 3.1.6 바디 카테고리 패키지
```yaml
body_packages:
  BODY_BASIC:
    package_code: "BODY_BASIC"
    name: "원데이 바디 슬림"
    price_tier: "basic"
    final_price: 445500
    effectiveness:
      localized_fat: 85
      cellulite: 80
      body_elasticity_loss: 75
    highlight_points: ["부분 지방 감소", "탄력 개선", "순환 개선"]
```

---

## 4. 패키지 매칭 점수 계산 알고리즘

### 4.1 기본 점수 계산 공식

```typescript
// TypeScript 구현 (Next.js API Route용)
import { createClient } from '@/lib/supabase/server';

interface UserConcern {
  concern_id: string;
  severity: number; // 1-5
}

interface Package {
  package_code: string;
  effectiveness: Record<string, number>;
  price_tier: string;
  final_price: number;
  duration_minutes: number;
  highlight_points: string[];
}

async function calculatePackageBaseScore(
  packageData: Package, 
  userConcerns: UserConcern[]
): Promise<{ baseScore: number; coveredConcerns: number }> {
  const supabase = createClient();
  
  let totalWeightedScore = 0;
  let totalWeight = 0;
  let coveredConcerns = 0;
  
  for (const concern of userConcerns) {
    const concernId = concern.concern_id;
    const severity = concern.severity;
    
    // Supabase에서 고민별 가중치 조회
    const { data: concernData } = await supabase
      .from('concerns')
      .select('weight')
      .eq('id', concernId)
      .single();
      
    const concernWeight = concernData?.weight || 1.0;
    
    if (packageData.effectiveness[concernId]) {
      const effectiveness = packageData.effectiveness[concernId];
      coveredConcerns += 1;
      
      // 심각도 가중치: 심각할수록 높은 효과 요구
      const severityMultiplier = 0.7 + (severity - 1) * 0.075; // 0.7 ~ 1.0
      
      // 개별 고민 점수
      const concernScore = effectiveness * severityMultiplier * concernWeight;
      
      totalWeightedScore += concernScore;
      totalWeight += concernWeight;
    }
  }
  
  // 가중 평균 점수 (0-100)
  let baseScore = 0;
  if (totalWeight > 0) {
    baseScore = totalWeightedScore / totalWeight;
    
    // 고민 커버리지 보너스 (여러 고민을 해결하는 패키지 우대)
    const coverageBonus = (coveredConcerns / userConcerns.length) * 10;
    baseScore = Math.min(baseScore + coverageBonus, 100);
  }
  
  return { baseScore, coveredConcerns };
}
```

### 4.2 가격대별 가중치 적용

```typescript
interface PersonalFactors {
  budget_conscious?: boolean;
  premium_preferred?: boolean;
  one_day_preferred?: boolean;
  immediate_results?: boolean;
  long_term_results?: boolean;
  quick_recovery?: boolean;
  comprehensive_care?: boolean;
}

function applyPriceTierWeights(
  baseScore: number, 
  packageData: Package, 
  personalFactors: PersonalFactors
): number {
  let adjustedScore = baseScore;
  const priceTier = packageData.price_tier;
  const finalPrice = packageData.final_price;
  
  // 1. 예산 민감도에 따른 가격대 가중치
  if (personalFactors.budget_conscious) {
    switch (priceTier) {
      case "basic":
        adjustedScore *= 1.20; // 20% 보너스
        break;
      case "premium":
        adjustedScore *= 0.95; // 5% 페널티
        break;
      case "luxury":
        adjustedScore *= 0.80; // 20% 페널티
        break;
      case "ultra":
        adjustedScore *= 0.65; // 35% 페널티
        break;
    }
  }
  
  // 2. 프리미엄 선호
  else if (personalFactors.premium_preferred) {
    switch (priceTier) {
      case "basic":
        adjustedScore *= 0.85; // 15% 페널티
        break;
      case "premium":
      case "luxury":
        adjustedScore *= 1.10; // 10% 보너스
        break;
      case "ultra":
        adjustedScore *= 1.15; // 15% 보너스
        break;
    }
  }
  
  // 3. 원데이 올킬 선호 (시술 시간 고려)
  if (personalFactors.one_day_preferred) {
    const duration = packageData.duration_minutes || 60;
    if (duration <= 120) { // 2시간 이내
      adjustedScore *= 1.08; // 8% 보너스
    } else if (duration >= 240) { // 4시간 이상
      adjustedScore *= 0.92; // 8% 페널티
    }
  }
  
  // 4. 즉각적 효과 선호
  if (personalFactors.immediate_results) {
    const highlights = packageData.highlight_points || [];
    if (highlights.some(h => h.includes('즉시') || h.includes('즉각'))) {
      adjustedScore *= 1.10; // 10% 보너스
    }
  }
  
  // 5. 장기 효과 선호
  if (personalFactors.long_term_results) {
    const highlights = packageData.highlight_points || [];
    if (highlights.some(h => h.includes('1년 이상') || h.includes('2년'))) {
      adjustedScore *= 1.12; // 12% 보너스
    }
  }
  
  // 6. 회복기간 고려
  if (personalFactors.quick_recovery) {
    const highlights = packageData.highlight_points || [];
    if (highlights.some(h => h.includes('회복기간 없음') || h.includes('즉시 일상'))) {
      adjustedScore *= 1.10; // 10% 보너스
    }
  }
  
  return Math.min(adjustedScore, 100);
}
```

### 4.3 패키지 다양성 보장 알고리즘

```typescript
interface ScoredPackage {
  package_code: string;
  final_score: number;
  covered_concerns: number;
}

interface Recommendation {
  package_code: string;
  package_name: string;
  category: string;
  price_tier: string;
  match_score: number;
  rank_order: number;
  final_price: number;
  reasoning: string;
  highlight_points: string[];
  covered_concerns: number;
}

async function ensurePackageDiversity(
  scoredPackages: Map<string, ScoredPackage>,
  maxRecommendations: number = 3
): Promise<Recommendation[]> {
  const supabase = createClient();
  
  // 점수 순으로 정렬
  const sortedPackages = Array.from(scoredPackages.entries())
    .sort((a, b) => b[1].final_score - a[1].final_score);
  
  const selectedRecommendations: Recommendation[] = [];
  const usedPriceTiers: Record<string, number> = {};
  const usedCategories: Set<string> = new Set();
  
  // 가격대별 제한
  const tierLimits = {
    'basic': 2,
    'premium': 2,
    'luxury': 1,
    'ultra': 1
  };
  
  for (const [packageCode, scoreData] of sortedPackages) {
    // Supabase에서 패키지 정보 조회
    const { data: packageInfo } = await supabase
      .from('packages')
      .select('*')
      .eq('package_code', packageCode)
      .single();
      
    if (!packageInfo) continue;
    
    const priceTier = packageInfo.price_tier;
    const category = packageInfo.category_id;
    const finalScore = scoreData.final_score;
    
    // 최소 점수 기준 (65점 이하 제외)
    if (finalScore < 65) continue;
    
    // 가격대별 제한 확인
    if ((usedPriceTiers[priceTier] || 0) >= tierLimits[priceTier]) continue;
    
    // 동일 카테고리 중복 방지
    if (usedCategories.has(category)) continue;
    
    // 가격 다양성 확인
    if (selectedRecommendations.length > 0) {
      const existingPrices = selectedRecommendations.map(r => r.final_price);
      if (!checkPriceDiversity(packageInfo.final_price, existingPrices)) continue;
    }
    
    // 추천에 추가
    const recommendation: Recommendation = {
      package_code: packageCode,
      package_name: packageInfo.name_ko,
      category: category,
      price_tier: priceTier,
      match_score: Math.round(finalScore),
      rank_order: selectedRecommendations.length + 1,
      final_price: packageInfo.final_price,
      reasoning: generatePackageReasoning(packageInfo, scoreData),
      highlight_points: packageInfo.highlight_benefits.ko || [],
      covered_concerns: scoreData.covered_concerns
    };
    
    selectedRecommendations.push(recommendation);
    usedPriceTiers[priceTier] = (usedPriceTiers[priceTier] || 0) + 1;
    usedCategories.add(category);
    
    if (selectedRecommendations.length >= maxRecommendations) break;
  }
  
  // 최소 개수 보장
  if (selectedRecommendations.length < 2) {
    const fallbackPackages = await getFallbackPackages(
      sortedPackages,
      selectedRecommendations,
      2
    );
    selectedRecommendations.push(...fallbackPackages);
  }
  
  return selectedRecommendations;
}

function checkPriceDiversity(targetPrice: number, existingPrices: number[]): boolean {
  if (!existingPrices.length) return true;
  
  for (const price of existingPrices) {
    const priceRatio = Math.abs(targetPrice - price) / Math.max(targetPrice, price);
    if (priceRatio < 0.3) return false; // 30% 미만 차이면 거부
  }
  
  return true;
}
```

### 4.4 패키지 추천 이유 생성

```typescript
function generatePackageReasoning(
  packageInfo: any,
  scoringFactors: any
): string {
  const reasons: string[] = [];
  
  // 고민 해결 효과 강조
  const coveredConcerns = scoringFactors.covered_concerns || 0;
  if (coveredConcerns >= 3) {
    reasons.push(`${coveredConcerns}개 고민 동시 해결`);
  } else if (coveredConcerns >= 2) {
    reasons.push("복합 고민 효과적 해결");
  }
  
  // 가격대별 특징
  switch (packageInfo.price_tier) {
    case 'basic':
      reasons.push("부담 없는 가격대");
      break;
    case 'premium':
      reasons.push("최적의 가성비");
      break;
    case 'luxury':
      reasons.push("프리미엄 퀄리티");
      break;
    case 'ultra':
      reasons.push("최고급 토탈 케어");
      break;
  }
  
  // 주요 효과 포인트
  const highlightPoints = packageInfo.highlight_benefits?.ko || [];
  if (highlightPoints.length > 0) {
    reasons.push(highlightPoints[0]);
  }
  
  // 개인 상황 고려사항
  const personalBonuses = scoringFactors.personal_bonuses || [];
  
  if (personalBonuses.includes('budget_bonus') && packageInfo.price_tier === 'basic') {
    reasons.push("예산에 딱 맞아");
  }
  
  if (personalBonuses.includes('one_day_bonus')) {
    reasons.push("하루 만에 완성");
  }
  
  // 기본 이유
  if (reasons.length === 0) {
    reasons.push("종합적으로 적합한 패키지");
  }
  
  return reasons.slice(0, 3).join(", ");
}
```

---

## 5. A/B 테스트 지원

### 5.1 알고리즘 버전 관리

```typescript
const ALGORITHM_VERSIONS = {
  'v1.1_value_focused': {
    name: '가성비 중심',
    description: '베이직/프리미엄 패키지 우선 추천',
    config: {
      min_score_threshold: 65,
      basic_bonus_multiplier: 1.1,
      premium_bonus_multiplier: 1.05,
      max_recommendations: 3
    }
  },
  
  'v1.1_premium_focused': {
    name: '프리미엄 중심', 
    description: '고가 패키지도 적극 추천',
    config: {
      min_score_threshold: 60,
      luxury_penalty_reduction: 0.5,
      max_recommendations: 3
    }
  },
  
  'v1.1_balanced': {
    name: '균형형',
    description: '다양한 가격대 균형 추천',
    config: {
      min_score_threshold: 65,
      price_diversity_weight: 1.2,
      max_recommendations: 3
    }
  }
};
```

### 5.2 실험 결과 측정

```typescript
async function logPackageRecommendationMetrics(
  sessionId: string,
  recommendations: Recommendation[],
  userActions: any
): Promise<void> {
  const supabase = createClient();
  const algorithmVersion = getAlgorithmVersion(sessionId);
  
  const metrics = {
    session_id: sessionId,
    algorithm_version: algorithmVersion,
    recommendations_count: recommendations.length,
    price_tier_distribution: getTierDistribution(recommendations),
    avg_match_score: recommendations.reduce((sum, r) => sum + r.match_score, 0) / recommendations.length,
    total_package_value: recommendations.reduce((sum, r) => sum + r.final_price, 0),
    user_actions: {
      viewed_details: countPackageViews(userActions),
      added_interest: countInterestAdditions(userActions),
      requested_quote: countQuoteRequests(userActions)
    },
    conversion_metrics: {
      view_to_interest_rate: calculateViewToInterestRate(userActions),
      interest_to_quote_rate: calculateInterestToQuoteRate(userActions)
    },
    timestamp: new Date().toISOString()
  };
  
  // Supabase에 저장
  await supabase
    .from('analytics_metrics')
    .insert(metrics);
}

function getTierDistribution(recommendations: Recommendation[]): Record<string, number> {
  const distribution: Record<string, number> = {
    basic: 0,
    premium: 0,
    luxury: 0,
    ultra: 0
  };
  
  for (const rec of recommendations) {
    distribution[rec.price_tier] = (distribution[rec.price_tier] || 0) + 1;
  }
  
  return distribution;
}
```

---

## 6. 성능 최적화

### 6.1 Vercel Edge 캐싱 전략

```typescript
// app/api/v1/packages/[packageCode]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Edge Runtime 사용

export async function GET(
  request: NextRequest,
  { params }: { params: { packageCode: string } }
) {
  // 캐시 키 생성
  const cacheKey = `package:${params.packageCode}`;
  
  // Edge Cache 사용
  return NextResponse.json(
    { package: packageData },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'max-age=3600',
        'Vercel-CDN-Cache-Control': 'max-age=3600'
      }
    }
  );
}

// 세션별 추천 결과 캐싱
export async function cachePackageRecommendations(
  sessionId: string,
  recommendations: Recommendation[]
): Promise<void> {
  // Vercel KV 또는 Supabase에 저장 (24시간)
  const supabase = createClient();
  
  await supabase
    .from('recommendation_cache')
    .upsert({
      session_id: sessionId,
      recommendations: recommendations,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    });
}
```

### 6.2 배치 처리 최적화

```typescript
// 벡터화된 패키지 점수 계산 (대량 처리 시)
async function batchCalculatePackageScores(
  packages: Package[],
  userConcerns: UserConcern[],
  personalFactors: PersonalFactors
): Promise<Map<string, { final_score: number; covered_concerns: number }>> {
  // 병렬 처리를 위한 Promise 배열
  const scorePromises = packages.map(async (pkg) => {
    const { baseScore, coveredConcerns } = await calculatePackageBaseScore(pkg, userConcerns);
    const finalScore = applyPriceTierWeights(baseScore, pkg, personalFactors);
    
    return {
      packageCode: pkg.package_code,
      scoreData: {
        final_score: finalScore,
        covered_concerns: coveredConcerns
      }
    };
  });
  
  // 모든 계산 병렬 실행
  const results = await Promise.all(scorePromises);
  
  // Map으로 변환
  const scoreMap = new Map();
  results.forEach(({ packageCode, scoreData }) => {
    scoreMap.set(packageCode, scoreData);
  });
  
  return scoreMap;
}
```

---

## 7. 오류 처리 및 폴백

### 7.1 데이터 부족 시 대응

```typescript
async function handleInsufficientPackageData(
  userConcerns: UserConcern[],
  availablePackages: Package[]
): Promise<Recommendation[]> {
  const supabase = createClient();
  
  // 1. 사용자 고민과 매치되는 패키지가 없는 경우
  if (!availablePackages || availablePackages.length === 0) {
    // 주 카테고리 기반 인기 패키지 추천
    const mainCategory = getMainCategoryFromConcerns(userConcerns);
    const { data: popularPackages } = await supabase
      .from('packages')
      .select('*')
      .eq('category_id', mainCategory)
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })
      .limit(3);
      
    return formatAsRecommendations(popularPackages || []);
  }
  
  // 2. 매칭 점수가 모두 낮은 경우 (< 60점)
  const lowScoreCount = availablePackages.filter(p => (p as any).score < 60).length;
  if (lowScoreCount === availablePackages.length) {
    // 가격대별 베스트셀러 패키지로 대체
    return await getBestsellerPackages();
  }
  
  // 3. 특정 가격대만 나오는 경우
  return await ensurePriceDiversityFallback(availablePackages);
}

async function getBestsellerPackages(): Promise<Recommendation[]> {
  const supabase = createClient();
  
  const bestsellers = {
    'basic': ['ELASTICITY_BASIC', 'TEXTURE_BASIC', 'PIGMENT_BASIC'],
    'premium': ['ELASTICITY_PREMIUM', 'VOLUME_PREMIUM'],
    'luxury': ['ELASTICITY_LUXURY']
  };
  
  const recommendations: Recommendation[] = [];
  
  for (const [tier, packageCodes] of Object.entries(bestsellers)) {
    if (packageCodes.length > 0) {
      const { data: pkg } = await supabase
        .from('packages')
        .select('*')
        .eq('package_code', packageCodes[0])
        .single();
        
      if (pkg) {
        recommendations.push({
          package_code: pkg.package_code,
          package_name: pkg.name_ko,
          category: pkg.category_id,
          price_tier: tier,
          match_score: 70, // 기본 점수
          rank_order: recommendations.length + 1,
          final_price: pkg.final_price,
          reasoning: '인기 패키지',
          highlight_points: pkg.highlight_benefits?.ko || [],
          covered_concerns: 0
        });
      }
      
      if (recommendations.length >= 3) break;
    }
  }
  
  return recommendations;
}
```

### 7.2 알고리즘 안전장치

```typescript
function validatePackageRecommendations(recommendations: Recommendation[]): string[] {
  const errors: string[] = [];
  
  // 1. 추천 개수 검증
  if (recommendations.length < 2) {
    errors.push("최소 2개 패키지 추천 필요");
  } else if (recommendations.length > 3) {
    errors.push("최대 3개까지 추천 가능");
  }
  
  // 2. 가격 다양성 검증
  const priceTiers = recommendations.map(r => r.price_tier);
  if (new Set(priceTiers).size < 2) {
    errors.push("다양한 가격대 추천 필요");
  }
  
  // 3. 점수 유효성 검증
  for (const rec of recommendations) {
    if (rec.match_score < 0 || rec.match_score > 100) {
      errors.push(`잘못된 점수: ${rec.match_score}`);
    }
  }
  
  // 4. 중복 검증
  const packageCodes = recommendations.map(r => r.package_code);
  if (packageCodes.length !== new Set(packageCodes).size) {
    errors.push("중복된 패키지 추천");
  }
  
  // 5. 필수 필드 검증
  const requiredFields = ['package_code', 'match_score', 'reasoning', 'price_tier'];
  for (const rec of recommendations) {
    for (const field of requiredFields) {
      if (!(field in rec)) {
        errors.push(`필수 필드 누락: ${field}`);
      }
    }
  }
  
  // 6. 총 가격 검증
  const totalPrice = recommendations.reduce((sum, r) => sum + r.final_price, 0);
  if (totalPrice > 10000000) { // 1000만원 초과
    errors.push("추천 패키지 총액이 너무 높음");
  }
  
  return errors;
}

function applyPackageSafetyFilters(
  packages: Package[],
  personalFactors: PersonalFactors
): Package[] {
  let safePackages = [...packages];
  
  // 예산 제한 확인
  if (personalFactors.strict_budget) {
    safePackages = safePackages.filter(p => p.final_price <= 2000000);
  }
  
  // 시간 제한 확인
  if (personalFactors.limited_time) {
    safePackages = safePackages.filter(p => (p.duration_minutes || 0) <= 180);
  }
  
  // 첫 방문자 필터
  if (personalFactors.first_timer) {
    safePackages = safePackages.filter(p => p.price_tier !== 'ultra');
  }
  
  return safePackages;
}
```

---

## 8. 패키지 카탈로그 연동

### 8.1 카탈로그 데이터 동기화

```typescript
async function syncPackageCatalog(): Promise<void> {
  const supabase = createClient();
  
  // 활성 패키지 조회
  const { data: catalogPackages } = await supabase
    .from('packages')
    .select(`
      *,
      package_items (
        *,
        treatment:treatments_base (*)
      )
    `)
    .eq('is_active', true);
    
  if (!catalogPackages) return;
  
  for (const pkg of catalogPackages) {
    // 효과성 매핑 계산
    const effectiveness = calculatePackageEffectivenessFromItems(pkg.package_items);
    
    // 패키지 효과성 업데이트
    await supabase
      .from('package_effectiveness')
      .upsert({
        package_code
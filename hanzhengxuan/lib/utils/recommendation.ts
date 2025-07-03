interface UserInput {
  step_number: number
  selected_concerns: any
}

interface Package {
  id: string
  package_code: string
  name_ko: string
  name_cn: string
  category_id: string
  concern_tags: string[]
  price_tier: string
  final_price: number
}

export interface RecommendationResult {
  package_id: string
  package_code: string
  package_name: string
  match_score: number
  reasoning: string
  price_tier: string
  final_price: number
}

/**
 * Calculate package recommendations based on user inputs
 */
export function calculateSimpleRecommendations(
  packages: Package[],
  userInputs: UserInput[]
): RecommendationResult[] {
  // Extract selected categories from step 1
  const selectedCategories = userInputs
    .find(input => input.step_number === 1)
    ?.selected_concerns || []
  
  // Extract selected concerns from step 2
  const selectedConcerns = userInputs
    .find(input => input.step_number === 2)
    ?.selected_concerns || []
  
  // Extract preferences from step 3
  const preferences = userInputs
    .find(input => input.step_number === 3)
    ?.selected_concerns || {}
  
  // Calculate match score for each package
  const scoredPackages = packages.map(pkg => {
    let score = 0
    let matchedConcerns = 0
    let reasoning = []
    
    // 1. Category match (30 points)
    if (selectedCategories.includes(pkg.category_id)) {
      score += 30
      reasoning.push('카테고리 일치')
    }
    
    // 2. Concern tags match (50 points total)
    if (pkg.concern_tags && selectedConcerns.length > 0) {
      matchedConcerns = pkg.concern_tags.filter(
        (tag: string) => selectedConcerns.includes(tag)
      ).length
      
      const concernScore = (matchedConcerns / selectedConcerns.length) * 50
      score += concernScore
      
      if (matchedConcerns > 0) {
        reasoning.push(`고민 ${matchedConcerns}개 해결`)
      }
    }
    
    // 3. Price preference match (20 points)
    const budgetPreference = preferences.budget_range
    if (budgetPreference) {
      const priceMatch = checkPriceMatch(pkg.price_tier, budgetPreference)
      if (priceMatch) {
        score += 20
        reasoning.push('예산 범위 일치')
      }
    }
    
    return {
      package_id: pkg.id,
      package_code: pkg.package_code,
      package_name: pkg.name_ko,
      price_tier: pkg.price_tier,
      final_price: pkg.final_price,
      match_score: Math.round(score),
      reasoning: reasoning.join(', ') || '기본 추천'
    }
  })
  
  // Filter and apply diversity
  return filterByPriceTier(scoredPackages)
}

/**
 * Check if package price tier matches user budget preference
 */
function checkPriceMatch(priceTier: string, budgetRange: string): boolean {
  const tierMap: Record<string, string[]> = {
    'economy': ['basic'],
    'standard': ['basic', 'premium'],
    'premium': ['premium', 'luxury'],
    'luxury': ['luxury', 'ultra']
  }
  
  return tierMap[budgetRange]?.includes(priceTier) || false
}

/**
 * Filter packages ensuring price tier diversity
 */
export function filterByPriceTier(packages: RecommendationResult[]): RecommendationResult[] {
  // Sort by match score (descending)
  const sorted = packages.sort((a, b) => b.match_score - a.match_score)
  const result: RecommendationResult[] = []
  const usedTiers = new Set<string>()
  
  // First pass: select top scoring from each tier (max 3)
  for (const pkg of sorted) {
    if (result.length >= 3) break
    
    // Only include packages with minimum 40% match
    if (pkg.match_score >= 40 && !usedTiers.has(pkg.price_tier)) {
      result.push(pkg)
      usedTiers.add(pkg.price_tier)
    }
  }
  
  // Second pass: ensure minimum 2 recommendations
  if (result.length < 2) {
    const remaining = sorted.filter(
      p => !result.find(r => r.package_id === p.package_id) && p.match_score >= 30
    )
    result.push(...remaining.slice(0, 2 - result.length))
  }
  
  // If still not enough, add top packages regardless of score
  if (result.length < 2) {
    const allRemaining = sorted.filter(
      p => !result.find(r => r.package_id === p.package_id)
    )
    result.push(...allRemaining.slice(0, 2 - result.length))
  }
  
  // Sort final results by price tier for display
  const tierOrder = ['basic', 'premium', 'luxury', 'ultra']
  return result.sort((a, b) => {
    return tierOrder.indexOf(a.price_tier) - tierOrder.indexOf(b.price_tier)
  })
}
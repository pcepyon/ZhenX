// Store type definitions

export interface Concern {
  id: string
  categoryId: string
  name: string
  severity?: number
}

export interface PersonalFactor {
  id: string
  label: string
  checked: boolean
}

export interface Package {
  packageCode: string
  name: string
  priceTier: string
  finalPrice: number
  matchScore: number
  categoryId?: string
  description?: string
  originalPrice?: number
  discountPercent?: number
}

export interface PriceBreakdown {
  original_price_krw: number
  discount_amount_krw: number
  discount_percent: number
  final_price_krw: number
  original_price_cny: number
  discount_amount_cny: number
  final_price_cny: number
  exchange_rate: number
}

export interface AppState {
  // Session state
  sessionId: string
  setSessionId: (id: string) => void
  
  // Wizard state
  selectedCategories: string[]
  selectedConcerns: Concern[]
  personalFactors: PersonalFactor[]
  
  // Recommendation state
  recommendations: Package[]
  setRecommendations: (packages: Package[]) => void
  
  // Interest tracking
  interestedPackages: string[]
  
  // Actions - Categories
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
  clearCategories: () => void
  
  // Actions - Concerns
  toggleConcern: (concern: Concern) => void
  clearConcerns: () => void
  setConcernsByCategoryId: (categoryId: string, concerns: Concern[]) => void
  
  // Actions - Personal Factors
  togglePersonalFactor: (factorId: string) => void
  setPersonalFactors: (factors: PersonalFactor[]) => void
  
  // Actions - Interests
  addInterest: (packageCode: string) => void
  removeInterest: (packageCode: string) => void
  isInterested: (packageCode: string) => boolean
  clearAllInterests: () => void
  
  // Actions - Reset
  resetWizard: () => void
  resetAll: () => void
}

// Default personal factors
export const defaultPersonalFactors: PersonalFactor[] = [
  { id: 'skin_sensitivity', label: '皮肤敏感', checked: false },
  { id: 'first_time', label: '首次医美', checked: false },
  { id: 'pain_sensitive', label: '怕痛', checked: false },
  { id: 'quick_recovery', label: '需要快速恢复', checked: false },
  { id: 'natural_effect', label: '追求自然效果', checked: false },
  { id: 'budget_conscious', label: '预算有限', checked: false }
]
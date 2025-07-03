export interface Category {
  id: string
  name: string
  icon: string
  description: string
  display_order: number
  is_active: boolean
}

export interface UserSession {
  session_id: string
  user_agent: string
  ip_address: string
  created_at: string
  expires_at: string
}

export interface Concern {
  id: string
  category_id: string
  name: string
  display_order: number
  is_active: boolean
}

export interface Package {
  id: string
  name: string
  category_id: string
  description: string
  price_krw: number
  discounted_price_krw: number
  duration_days: number
  recovery_days: number
  hospital_name: string
  doctor_name: string
  location: string
  included_services: string[]
  image_url: string
  is_promoted: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PackageConcern {
  id: string
  package_id: string
  concern_id: string
}

export interface SessionSelection {
  id: string
  session_id: string
  category_id: string
  concern_ids: string[]
  budget_range: string
  recovery_time: string
  stay_duration: string
  created_at: string
}

export interface SessionRecommendation {
  id: string
  session_id: string
  package_id: string
  match_score: number
  reasons: string[]
  created_at: string
}

export interface Quote {
  quote_id: string
  session_id: string
  package_id: string
  original_price_krw: number
  discount_amount_krw: number
  final_price_krw: number
  price_cny: number
  exchange_rate: number
  included_services: string[]
  additional_notes: string
  valid_until: string
  created_at: string
  view_count: number
}

export interface ReferralTracking {
  id: string
  referrer_quote_id: string
  referred_session_id: string
  referral_source: string
  created_at: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface SessionResponse {
  session_id: string
  expires_at: string
  language?: string
  country_code?: string
}

// Package and Treatment Types
export interface Treatment {
  id: string
  code: string
  name_ko: string
  name_cn: string
  base_price: number
  duration_minutes: number
}

export interface PackageItem {
  id: string
  package_id: string
  treatment_id: string
  quantity: number
  treatment?: Treatment
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

export interface PriceDisplay {
  original_krw: number
  discounted_krw: number
  discount_percent: number
  original_cny: number
  discounted_cny: number
}

// Quote Types
export interface Quote {
  id: string
  quote_id: string
  session_id: string
  packages: QuotePackage[]
  personal_info: PersonalInfo
  total_price: number
  currency: string
  created_at: string
  expires_at: string
}

export interface QuotePackage {
  id: string
  package_code: string
  name_ko: string
  name_cn: string
  category_id: string
  price_tier: string
  final_price: number
}

export interface PersonalInfo {
  name?: string
  phone?: string
  email?: string
  visit_date?: string
  memo?: string
}

export interface QuoteResponse {
  quote_id: string
  quote_url: string
  total_price: number
  total_price_cny: number
  expires_at: string
  created_at: string
  package_count: number
}

export interface QuoteDetail {
  quote_id: string
  created_at: string
  expires_at: string
  remaining_days: number
  packages: QuotePackageDetail[]
  package_count: number
  pricing: {
    total_price_krw: number
    total_price_cny: number
    currency: string
    exchange_rate: {
      rate: number
      source: string
      target: string
      description: string
    }
  }
  personal_info: PersonalInfo
  share_url: string
}

export interface QuotePackageDetail {
  package_code: string
  name_ko: string
  name_cn: string
  category_id: string
  price_tier: string
  final_price_krw: number
  final_price_cny: number
}
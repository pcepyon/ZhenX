import { createClient } from '@/lib/supabase/server'

/**
 * Generate unique quote ID with format Q + YYMMDD + 4 random digits
 */
export async function generateQuoteId(): Promise<string> {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  
  // Try up to 5 times to generate unique ID
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const quoteId = `Q${year}${month}${day}${random}`
    
    // Check if ID already exists
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('quotes')
      .select('quote_id')
      .eq('quote_id', quoteId)
      .single()
    
    if (error || !data) {
      // ID doesn't exist, we can use it
      return quoteId
    }
  }
  
  // Fallback: add timestamp milliseconds if all attempts fail
  const timestamp = Date.now().toString().slice(-4)
  return `Q${year}${month}${day}${timestamp}`
}

/**
 * Calculate total price from packages
 */
export function calculateTotal(packages: any[]): number {
  if (!packages || packages.length === 0) return 0
  return packages.reduce((sum, pkg) => sum + (pkg.final_price || 0), 0)
}

/**
 * Format currency with proper symbols and separators
 */
export function formatCurrency(amount: number, currency: 'KRW' | 'CNY' = 'KRW'): string {
  if (currency === 'CNY') {
    // 1 CNY = 190 KRW (as per spec)
    const cnyAmount = Math.round(amount / 190)
    return `¥${cnyAmount.toLocaleString('zh-CN')}`
  }
  return `₩${amount.toLocaleString('ko-KR')}`
}

/**
 * Convert KRW to CNY
 */
export function convertToCNY(krwAmount: number): number {
  return Math.round(krwAmount / 190)
}

/**
 * Get exchange rate info
 */
export function getExchangeRate() {
  return {
    rate: 190,
    source: 'KRW',
    target: 'CNY',
    description: '1 CNY = 190 KRW'
  }
}

/**
 * Format date for display
 */
export function formatQuoteDate(dateString: string, locale: 'ko' | 'zh' = 'ko'): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  if (locale === 'zh') {
    return date.toLocaleDateString('zh-CN', options)
  }
  return date.toLocaleDateString('ko-KR', options)
}

/**
 * Check if quote is expired
 */
export function isQuoteExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date()
}

/**
 * Get remaining valid days
 */
export function getRemainingDays(expiresAt: string): number {
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diffTime = expiry.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}
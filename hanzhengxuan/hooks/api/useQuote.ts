import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { useAppStore } from '@/store/useAppStore'

export interface QuotePackage {
  package_code: string
  name_ko: string
  name_cn: string
  price_tier: 'basic' | 'premium' | 'luxury'
  original_price?: number
  final_price?: number
  final_price_krw?: number
  final_price_cny?: number
  duration_minutes?: number
  treatments?: Array<{
    name_ko: string
    name_cn: string
    quantity: number
  }>
}

export interface Quote {
  quote_id: string
  created_at: string
  expires_at: string
  remaining_days: number
  packages?: Array<{
    package_code: string
    name_ko: string
    name_cn: string
    category_id: string
    price_tier: string
    final_price_krw: number
    final_price_cny: number
  }>
  package_count: number
  pricing: {
    total_price_krw: number
    total_price_cny: number
    currency: string
    exchange_rate: number
  }
  personal_info?: {
    name?: string
    visit_date?: string
    memo?: string
  }
  share_url: string
}

interface CreateQuotePayload {
  selected_packages: string[]
  notes?: string
}

export function useCreateQuote() {
  const sessionId = useAppStore((state) => state.sessionId)
  
  return useMutation({
    mutationFn: async (payload: CreateQuotePayload) => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.post<{ quote: Quote }>(
        `/sessions/${sessionId}/quotes`,
        payload
      )
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create quote')
      }
      
      return response.data.quote
    },
  })
}

export function useQuote(quoteId: string) {
  return useQuery({
    queryKey: ['quote', quoteId],
    queryFn: async () => {
      const response = await apiClient.get<Quote>(`/quotes/${quoteId}`)
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch quote')
      }
      
      return response.data
    },
    enabled: !!quoteId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: ({ state }) => {
      // Stop refetching if quote is expired
      if (state.data && state.data.remaining_days <= 0) return false
      // Refetch every minute to update remaining days
      return 60 * 1000
    },
  })
}

export function useSessionQuotes() {
  const sessionId = useAppStore((state) => state.sessionId)
  
  return useQuery({
    queryKey: ['quotes', sessionId],
    queryFn: async () => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.get<{ quotes: Quote[] }>(
        `/sessions/${sessionId}/quotes`
      )
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch quotes')
      }
      
      return response.data.quotes
    },
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
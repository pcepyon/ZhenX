import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { useAppStore } from '@/store/useAppStore'

export interface QuotePackage {
  package_code: string
  name_ko: string
  name_cn: string
  price_tier: 'basic' | 'premium' | 'luxury'
  original_price: number
  final_price: number
  duration_minutes: number
  treatments: Array<{
    name_ko: string
    name_cn: string
    quantity: number
  }>
}

export interface Quote {
  id: string
  quote_id: string
  session_id: string
  selected_packages: string[]
  total_price_krw: number
  total_discount_krw: number
  final_price_krw: number
  total_price_cny: number
  total_discount_cny: number
  final_price_cny: number
  exchange_rate: number
  is_expired: boolean
  remaining_days: number
  expires_at: string
  created_at: string
  personal_info?: {
    name?: string
    visit_date?: string
    memo?: string
  }
  packages?: QuotePackage[]
}

interface CreateQuotePayload {
  selected_packages: string[]
  notes?: string
}

interface QuoteResponse {
  quote: Quote
}

export function useCreateQuote() {
  const sessionId = useAppStore((state) => state.sessionId)
  const queryClient = useQuery
  
  return useMutation({
    mutationFn: async (payload: CreateQuotePayload) => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.post<QuoteResponse>(
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
      const response = await apiClient.get<QuoteResponse>(`/quotes/${quoteId}`)
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch quote')
      }
      
      return response.data.quote
    },
    enabled: !!quoteId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: (data) => {
      // Stop refetching if quote is expired
      if (data?.is_expired) return false
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
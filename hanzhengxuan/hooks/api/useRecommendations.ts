import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { useAppStore } from '@/store/useAppStore'
import type { Package } from './usePackages'

export interface Recommendation extends Package {
  match_score: number
  match_reasons: string[]
}

interface RecommendationsResponse {
  recommendations: Recommendation[]
  total_score: number
  created_at: string
}

export function useCreateRecommendations() {
  const sessionId = useAppStore((state) => state.sessionId)
  const setRecommendations = useAppStore((state) => state.setRecommendations)
  
  return useMutation({
    mutationFn: async () => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.post<RecommendationsResponse>(
        `/sessions/${sessionId}/recommendations`,
        {}
      )
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to create recommendations')
      }
      
      return response.data.recommendations
    },
    onSuccess: (data) => {
      // Update Zustand store with recommendations
      const packages = data.map(rec => ({
        packageCode: rec.package_code,
        name: rec.name,
        priceTier: rec.price_tier,
        finalPrice: rec.final_price,
        matchScore: rec.match_score,
        categoryId: rec.category_id,
        description: rec.description,
      }))
      setRecommendations(packages)
    },
  })
}

export function useRecommendations() {
  const sessionId = useAppStore((state) => state.sessionId)
  
  return useQuery({
    queryKey: ['recommendations', sessionId],
    queryFn: async () => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.get<RecommendationsResponse>(
        `/sessions/${sessionId}/recommendations`
      )
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch recommendations')
      }
      
      return response.data.recommendations
    },
    enabled: !!sessionId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
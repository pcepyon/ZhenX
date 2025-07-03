import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  concern_count: number
  is_active: boolean
  display_order: number
}

interface CategoriesResponse {
  categories: Category[]
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await apiClient.get<CategoriesResponse>('/categories')
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch categories')
      }
      
      return response.data.categories
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  })
}
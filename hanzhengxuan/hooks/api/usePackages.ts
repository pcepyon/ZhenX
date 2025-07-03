import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'

export interface Package {
  id: string
  package_code: string
  name: string
  category_id: string
  price_tier: 'basic' | 'premium' | 'luxury' | 'ultra'
  final_price: number
  discount_rate: number
  description: string
  key_features: string[]
  duration_minutes: number
  recovery_days: number
  is_active: boolean
  popularity_score: number
}

interface PackagesResponse {
  packages: Package[]
  total: number
}

interface UsePackagesOptions {
  categoryId?: string
  priceTier?: string
}

export function usePackages(options?: UsePackagesOptions) {
  const queryParams = new URLSearchParams()
  
  if (options?.categoryId) {
    queryParams.append('category', options.categoryId)
  }
  
  if (options?.priceTier) {
    queryParams.append('price_tier', options.priceTier)
  }
  
  const queryString = queryParams.toString()
  const url = queryString ? `/packages?${queryString}` : '/packages'
  
  return useQuery({
    queryKey: ['packages', options],
    queryFn: async () => {
      const response = await apiClient.get<PackagesResponse>(url)
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch packages')
      }
      
      return response.data.packages
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function usePackageDetails(packageId: string) {
  return useQuery({
    queryKey: ['package', packageId],
    queryFn: async () => {
      const response = await apiClient.get<{ package: Package }>(`/packages/${packageId}`)
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch package details')
      }
      
      return response.data.package
    },
    enabled: !!packageId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
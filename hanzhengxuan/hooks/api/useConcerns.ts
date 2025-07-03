import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface Concern {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  weight: number;
  created_at: string;
}

interface ConcernsResponse {
  concerns: Concern[];
}

export function useConcerns(categoryIds: string[]) {
  return useQuery<Concern[], Error>({
    queryKey: ['concerns', categoryIds],
    queryFn: async () => {
      if (categoryIds.length === 0) return [];
      
      // Fetch concerns for all selected categories
      const promises = categoryIds.map(categoryId =>
        apiClient.get<ConcernsResponse>(`/categories/${categoryId}/concerns`)
      );
      
      const responses = await Promise.all(promises);
      
      // Flatten all concerns from different categories
      return responses.flatMap(response => response.concerns);
    },
    enabled: categoryIds.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { apiClient } from '@/lib/api/client';

interface PersonalInfo {
  name?: string;
  visit_date?: string;
  memo?: string;
}

interface QuoteCreateRequest {
  selected_packages: string[];
  personal_info?: PersonalInfo;
}

interface QuoteCreateResponse {
  success: boolean;
  data: {
    quote_id: string;
    quote_url: string;
    total_price: number;
    expires_at: string;
  };
}

export function useCreateQuote() {
  const router = useRouter();
  const sessionId = useAppStore(state => state.sessionId);
  
  return useMutation<QuoteCreateResponse, Error, QuoteCreateRequest>({
    mutationFn: async (data) => {
      if (!sessionId) {
        throw new Error('세션이 없습니다');
      }
      
      const response = await apiClient.post<QuoteCreateResponse>(
        `/sessions/${sessionId}/quotes`,
        data
      );
      
      return response;
    },
    onSuccess: (data) => {
      // Clear selected packages from interests
      const { interestedPackages, removeInterest } = useAppStore.getState();
      data.data.quote_id && interestedPackages.forEach(pkg => {
        if (data.data.quote_id) {
          // Only remove packages that were included in the quote
          // This logic will be refined based on actual implementation
        }
      });
      
      // Navigate to success page
      router.push(`/quote/success?id=${data.data.quote_id}`);
    },
    onError: (error) => {
      console.error('Quote creation failed:', error);
    }
  });
}
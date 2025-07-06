import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { HospitalDetail } from '@/lib/types/hospital';

export const useHospitalDetail = (hospitalId: string | null) => {
  return useQuery({
    queryKey: ['hospital', hospitalId],
    queryFn: async () => {
      if (!hospitalId) throw new Error('Hospital ID is required');

      console.log('Fetching hospital detail for ID:', hospitalId);

      const supabase = createClient();
      const { data, error } = await supabase
        .from('hospitals')
        .select(`
          *,
          certifications:hospital_certifications(*),
          services:hospital_services(*),
          images:hospital_images(*)
        `)
        .eq('id', hospitalId)
        .single();
      
      if (error) {
        console.error('Hospital fetch error:', error);
        throw error;
      }
      
      console.log('Hospital data fetched:', data);
      
      // Transform the data to match our type structure
      const hospitalDetail: HospitalDetail = {
        ...data,
        certifications: data.certifications?.[0] || {},
        services: data.services?.[0] || {},
        images: data.images || []
      };
      
      return hospitalDetail;
    },
    enabled: !!hospitalId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { usePackages } from '@/hooks/api/usePackages';
import { useCreateQuote } from '@/hooks/useCreateQuote';
import { PackageSummary } from '@/components/quote/PackageSummary';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { QuoteOptions } from '@/components/quote/QuoteOptions';
import { Button } from '@/components/ui/Button';

interface PersonalInfo {
  name?: string;
  visit_date?: string;
  memo?: string;
}

export default function QuoteCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sessionId } = useAppStore();
  const { data: allPackages, isLoading: isLoadingPackages } = usePackages();
  const createQuote = useCreateQuote();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [quoteOptions, setQuoteOptions] = useState<Record<string, boolean>>({
    include_transportation: true,
    include_preparation: true,
    share_link: false
  });
  
  // Get selected package codes from URL
  const selectedPackageCodes = useMemo(() => {
    const packagesParam = searchParams.get('packages');
    return packagesParam ? packagesParam.split(',') : [];
  }, [searchParams]);
  
  // Filter packages based on selected codes
  const selectedPackages = useMemo(() => {
    if (!allPackages) return [];
    return allPackages.filter(pkg => 
      selectedPackageCodes.includes(pkg.package_code)
    );
  }, [allPackages, selectedPackageCodes]);
  
  // Redirect if no packages selected or no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    } else if (!isLoadingPackages && selectedPackages.length === 0) {
      router.push('/interests');
    }
  }, [sessionId, selectedPackages.length, isLoadingPackages, router]);
  
  const handleSubmit = async () => {
    if (selectedPackages.length === 0) return;
    
    // Filter out empty personal info fields
    const filteredPersonalInfo = Object.entries(personalInfo).reduce((acc, [key, value]) => {
      if (value && value.trim() !== '') {
        acc[key as keyof PersonalInfo] = value;
      }
      return acc;
    }, {} as PersonalInfo);
    
    // Create quote request
    const quoteData = {
      selected_packages: selectedPackageCodes,
      personal_info: Object.keys(filteredPersonalInfo).length > 0 ? filteredPersonalInfo : undefined
    };
    
    createQuote.mutate(quoteData);
  };
  
  if (isLoadingPackages || selectedPackages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              견적서 만들기
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              선택한 패키지로 견적서를 생성해요
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="뒤로가기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M19 12H5M5 12L12 19M5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="px-5 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Package summary */}
          <PackageSummary packages={selectedPackages} />
          
          {/* Personal info form */}
          <QuoteForm onInfoChange={setPersonalInfo} />
          
          {/* Quote options */}
          <QuoteOptions onOptionsChange={setQuoteOptions} />
          
          {/* Submit button */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={createQuote.isPending}
              className="w-full"
            >
              {createQuote.isPending ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  견적서 생성 중...
                </>
              ) : (
                '견적서 생성하기'
              )}
            </Button>
            
            {createQuote.isError && (
              <p className="text-sm text-red-600 text-center mt-2">
                견적서 생성에 실패했습니다. 다시 시도해주세요.
              </p>
            )}
          </div>
          
          {/* Info text */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              견적서는 발급 후 7일간 유효하며<br />
              고유 번호로 언제든지 조회할 수 있어요
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
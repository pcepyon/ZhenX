'use client';

import { useParams, notFound } from 'next/navigation';
import { useQuote } from '@/hooks/api/useQuote';
import { QuoteHeader } from '@/components/quote/QuoteHeader';
import { QuotePackages } from '@/components/quote/QuotePackages';
import { QuoteTotal } from '@/components/quote/QuoteTotal';
import { QuoteFooter } from '@/components/quote/QuoteFooter';

// Mock data for development
const getMockQuoteData = (quoteId: string) => ({
  id: '1',
  quote_id: quoteId,
  session_id: 'mock-session',
  selected_packages: ['ELASTICITY_PREMIUM', 'WHITENING_BASIC'],
  total_price_krw: 3500000,
  total_discount_krw: 350000,
  final_price_krw: 3150000,
  total_price_cny: 18421,
  total_discount_cny: 1842,
  final_price_cny: 16579,
  exchange_rate: 190,
  is_expired: false,
  remaining_days: 5,
  expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  created_at: new Date().toISOString(),
  personal_info: {
    name: '김민지',
    visit_date: '2025-02-15'
  },
  packages: [
    {
      package_code: 'ELASTICITY_PREMIUM',
      name_ko: '프리미엄 탄력 패키지',
      name_cn: '高级弹性护理套餐',
      price_tier: 'premium' as const,
      original_price: 2200000,
      final_price: 1980000,
      duration_minutes: 120,
      treatments: [
        { name_ko: '울쎄라', name_cn: '超声刀', quantity: 1 },
        { name_ko: '써마지FLX', name_cn: '热玛吉FLX', quantity: 1 },
        { name_ko: '보톡스', name_cn: '肉毒素', quantity: 2 }
      ]
    },
    {
      package_code: 'WHITENING_BASIC',
      name_ko: '베이직 미백 패키지',
      name_cn: '基础美白套餐',
      price_tier: 'basic' as const,
      original_price: 1300000,
      final_price: 1170000,
      duration_minutes: 90,
      treatments: [
        { name_ko: '레이저토닝', name_cn: '激光嫩肤', quantity: 3 },
        { name_ko: '비타민C 이온토', name_cn: '维生素C导入', quantity: 3 }
      ]
    }
  ]
});

export default function QuotePage() {
  const params = useParams();
  const quoteId = params.quoteId as string;
  
  // Use API data
  const { data: apiData, isLoading, error } = useQuote(quoteId);
  
  // Transform API data to match the expected structure
  const quoteData = apiData ? {
    ...apiData,
    quote_id: apiData.quote_id,
    total_price_krw: apiData.pricing?.total_price_krw || 0,
    total_discount_krw: 0, // API doesn't provide discount info
    final_price_krw: apiData.pricing?.total_price_krw || 0,
    total_price_cny: apiData.pricing?.total_price_cny || 0,
    total_discount_cny: 0,
    final_price_cny: apiData.pricing?.total_price_cny || 0,
    exchange_rate: apiData.pricing?.exchange_rate || 190,
    is_expired: false,
    remaining_days: apiData.remaining_days || 0,
    expires_at: apiData.expires_at,
    created_at: apiData.created_at,
    personal_info: apiData.personal_info || {},
    packages: apiData.packages?.map(pkg => ({
      ...pkg,
      original_price: pkg.final_price_krw,
      final_price: pkg.final_price_krw,
      duration_minutes: 90, // Default since API doesn't provide
      treatments: [] // API doesn't provide treatment details
    })) || []
  } : getMockQuoteData(quoteId);
  
  // Check if quote is expired
  if (!isLoading && (error || !quoteData || quoteData.is_expired)) {
    notFound();
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">견적서를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO metadata would be handled by generateMetadata in server component */}
      
      {/* Quote Header */}
      <QuoteHeader
        quoteId={quoteData.quote_id}
        createdAt={quoteData.created_at}
        expiresAt={quoteData.expires_at}
      />
      
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-5 py-8">
        {/* Personal info (if provided) */}
        {quoteData.personal_info && (quoteData.personal_info.name || quoteData.personal_info.visit_date) && (
          <section className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">고객 정보</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {quoteData.personal_info.name && (
                <div>
                  <span className="text-gray-600">이름:</span>
                  <span className="ml-2 font-medium">{quoteData.personal_info.name}</span>
                </div>
              )}
              {quoteData.personal_info.visit_date && (
                <div>
                  <span className="text-gray-600">방문 예정일:</span>
                  <span className="ml-2 font-medium">
                    {new Date(quoteData.personal_info.visit_date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              )}
            </div>
            {quoteData.personal_info.memo && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-600">메모:</span>
                <p className="mt-1 text-sm text-gray-700">{quoteData.personal_info.memo}</p>
              </div>
            )}
          </section>
        )}
        
        {/* Packages list */}
        {quoteData.packages && (
          <QuotePackages 
            packages={quoteData.packages} 
            className="mb-6"
          />
        )}
        
        {/* Total summary */}
        <QuoteTotal
          totalOriginalPrice={quoteData.total_price_krw}
          totalFinalPrice={quoteData.final_price_krw}
          discountAmount={quoteData.total_discount_krw}
          exchangeRate={quoteData.exchange_rate}
          className="mb-8"
        />
        
        {/* Additional info */}
        <section className="bg-blue-50 rounded-lg p-6 mb-8 print:break-before-avoid">
          <h3 className="font-semibold text-gray-900 mb-3">안내사항</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>본 견적서는 참고용이며, 실제 비용은 상담 후 확정됩니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>모든 가격은 VAT가 포함된 금액입니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>패키지 구성은 개인 상태에 따라 일부 조정될 수 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>견적서 유효기간: {new Date(quoteData.expires_at).toLocaleDateString('ko-KR')}까지</span>
            </li>
          </ul>
        </section>
      </main>
      
      {/* Quote Footer */}
      <QuoteFooter quoteId={quoteData.quote_id} />
    </div>
  );
}
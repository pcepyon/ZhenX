'use client';

import { useParams, notFound } from 'next/navigation';
import { useQuote } from '@/hooks/api/useQuote';
import { QuoteHeader } from '@/components/quote/QuoteHeader';
import { QuotePackages } from '@/components/quote/QuotePackages';
import { QuoteTotal } from '@/components/quote/QuoteTotal';
import { QuoteFooter } from '@/components/quote/QuoteFooter';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Briefcase } from 'lucide-react';

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
    exchange_rate: typeof apiData.pricing?.exchange_rate === 'object' 
      ? apiData.pricing.exchange_rate.rate 
      : (apiData.pricing?.exchange_rate || 190),
    is_expired: false,
    remaining_days: apiData.remaining_days || 0,
    expires_at: apiData.expires_at,
    created_at: apiData.created_at,
    personal_info: apiData.personal_info || {},
    packages: apiData.packages?.map(pkg => ({
      ...pkg,
      original_price: pkg.final_price_krw || pkg.final_price || 0,
      final_price: pkg.final_price_krw || pkg.final_price || 0,
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="inline-block w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-sm text-gray-600">견적서를 불러오는 중...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-10"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full opacity-10"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* SEO metadata would be handled by generateMetadata in server component */}
      
      {/* Quote Header */}
      <QuoteHeader
        quoteId={quoteData.quote_id}
        createdAt={quoteData.created_at}
        expiresAt={quoteData.expires_at}
      />
      
      {/* Main content */}
      <main className="relative max-w-4xl mx-auto px-5 py-8">
        {/* Personal info (if provided) */}
        {quoteData.personal_info && (quoteData.personal_info.name || quoteData.personal_info.visit_date) && (
          <motion.section 
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-medium text-gray-800">고객 정보</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quoteData.personal_info.name && (
                <motion.div 
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">이름</p>
                    <p className="font-medium text-gray-800">{quoteData.personal_info.name}</p>
                  </div>
                </motion.div>
              )}
              {quoteData.personal_info.visit_date && (
                <motion.div 
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">방문 예정일</p>
                    <p className="font-medium text-gray-800">
                      {new Date(quoteData.personal_info.visit_date).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
            {quoteData.personal_info.memo && (
              <motion.div 
                className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-gray-600 mb-1">메모</p>
                <p className="text-sm text-gray-700">{quoteData.personal_info.memo}</p>
              </motion.div>
            )}
          </motion.section>
        )}
        
        {/* Packages list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {quoteData.packages && (
            <QuotePackages 
              packages={quoteData.packages} 
              className="mb-6"
            />
          )}
        </motion.div>
        
        {/* Total summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <QuoteTotal
            totalOriginalPrice={quoteData.total_price_krw}
            totalFinalPrice={quoteData.final_price_krw}
            discountAmount={quoteData.total_discount_krw}
            exchangeRate={quoteData.exchange_rate}
            className="mb-8"
          />
        </motion.div>
        
        {/* Additional info */}
        <motion.section 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 print:break-before-avoid border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-800">안내사항</h3>
          </div>
          <ul className="space-y-3">
            {[
              "본 견적서는 참고용이며, 실제 비용은 상담 후 확정됩니다.",
              "모든 가격은 VAT가 포함된 금액입니다.",
              "패키지 구성은 개인 상태에 따라 일부 조정될 수 있습니다.",
              `견적서 유효기간: ${new Date(quoteData.expires_at).toLocaleDateString('ko-KR')}까지`
            ].map((text, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-3 text-sm text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1.5" />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </main>
      
      {/* Quote Footer */}
      <QuoteFooter quoteId={quoteData.quote_id} />
    </div>
  );
}
'use client';

import { cn } from '@/lib/utils';

interface QuoteInfo {
  quote_id: string;
  total_price: number;
  package_count: number;
  created_at: string;
  expires_at: string;
  personal_info?: {
    name?: string;
    visit_date?: string;
  };
}

interface QuoteInfoCardProps {
  quote: QuoteInfo;
  className?: string;
}

export function QuoteInfoCard({ quote, className }: QuoteInfoCardProps) {
  // Format dates
  const createdDate = new Date(quote.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const expiresDate = new Date(quote.expires_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate days until expiry
  const daysUntilExpiry = Math.ceil(
    (new Date(quote.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Convert to CNY
  const exchangeRate = 190;
  const totalPriceCNY = Math.round(quote.total_price / exchangeRate);
  
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg overflow-hidden",
      className
    )}>
      {/* Header with quote ID */}
      <div className="bg-primary-mint-light p-6 text-center">
        <p className="text-sm text-gray-600 mb-1">견적번호</p>
        <p className="text-2xl font-bold text-gray-900">{quote.quote_id}</p>
        <p className="text-xs text-gray-500 mt-1">
          {createdDate} 생성
        </p>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Personal info (if provided) */}
        {(quote.personal_info?.name || quote.personal_info?.visit_date) && (
          <div className="pb-4 border-b border-gray-100">
            {quote.personal_info.name && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">이름</span>
                <span className="font-medium">{quote.personal_info.name}</span>
              </div>
            )}
            {quote.personal_info.visit_date && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">방문 예정일</span>
                <span className="font-medium">
                  {new Date(quote.personal_info.visit_date).toLocaleDateString('ko-KR')}
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Package count */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">선택한 패키지</span>
          <span className="font-semibold text-gray-900">
            {quote.package_count}개
          </span>
        </div>
        
        {/* Total price */}
        <div className="flex justify-between items-baseline">
          <span className="text-gray-600">총 금액</span>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-mint">
              ₩{quote.total_price.toLocaleString('ko-KR')}
            </div>
            <div className="text-sm text-gray-500">
              ≈ ¥{totalPriceCNY.toLocaleString('zh-CN')}
            </div>
          </div>
        </div>
        
        {/* Validity */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">유효기간</span>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {expiresDate}까지
              </p>
              <p className={cn(
                "text-xs",
                daysUntilExpiry <= 2 ? "text-red-500" : "text-gray-500"
              )}>
                {daysUntilExpiry > 0 
                  ? `${daysUntilExpiry}일 남음` 
                  : '오늘 만료'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Notice */}
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-700 flex items-start gap-1">
            <svg 
              className="w-3 h-3 mt-0.5 shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
            이 견적서는 웹 링크로 언제든지 조회할 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
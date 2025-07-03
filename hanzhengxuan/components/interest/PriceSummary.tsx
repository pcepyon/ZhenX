'use client';

import { cn } from '@/lib/utils';

interface PriceSummaryProps {
  selectedCount: number;
  totalOriginalPrice: number;
  totalFinalPrice: number;
  vatIncluded?: boolean;
  className?: string;
}

export function PriceSummary({
  selectedCount,
  totalOriginalPrice,
  totalFinalPrice,
  vatIncluded = true,
  className
}: PriceSummaryProps) {
  const totalDiscount = totalOriginalPrice - totalFinalPrice;
  const discountPercent = totalOriginalPrice > 0 
    ? Math.round((totalDiscount / totalOriginalPrice) * 100)
    : 0;
  
  // Convert to CNY (1 CNY = 190 KRW)
  const exchangeRate = 190;
  const totalFinalPriceCNY = Math.round(totalFinalPrice / exchangeRate);
  
  if (selectedCount === 0) return null;
  
  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 p-4",
      className
    )}>
      <h3 className="font-semibold text-gray-900 mb-3">
        선택한 패키지 요약
      </h3>
      
      <div className="space-y-2">
        {/* Selected count */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">선택한 패키지</span>
          <span className="font-medium text-gray-900">{selectedCount}개</span>
        </div>
        
        {/* Original price */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">정가 합계</span>
            <span className="text-gray-500 line-through">
              ₩{totalOriginalPrice.toLocaleString('ko-KR')}
            </span>
          </div>
        )}
        
        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">할인 금액</span>
            <span className="font-medium text-red-500">
              -₩{totalDiscount.toLocaleString('ko-KR')} ({discountPercent}%)
            </span>
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-2" />
        
        {/* Final price */}
        <div className="flex justify-between items-baseline">
          <span className="font-medium text-gray-900">최종 금액</span>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-mint">
              ₩{totalFinalPrice.toLocaleString('ko-KR')}
            </div>
            <div className="text-sm text-gray-600">
              ≈ ¥{totalFinalPriceCNY.toLocaleString('zh-CN')}
            </div>
          </div>
        </div>
        
        {/* VAT notice */}
        {vatIncluded && (
          <p className="text-xs text-gray-500 mt-2">
            * VAT 포함 가격입니다
          </p>
        )}
      </div>
    </div>
  );
}
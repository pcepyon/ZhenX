import { cn } from '@/lib/utils';

interface QuoteTotalProps {
  totalOriginalPrice: number;
  totalFinalPrice: number;
  discountAmount: number;
  exchangeRate?: number;
  className?: string;
}

export function QuoteTotal({ 
  totalOriginalPrice,
  totalFinalPrice,
  discountAmount,
  exchangeRate = 190,
  className 
}: QuoteTotalProps) {
  const discountPercent = totalOriginalPrice > 0 
    ? Math.round((discountAmount / totalOriginalPrice) * 100)
    : 0;
  
  const totalFinalPriceCNY = Math.round(totalFinalPrice / exchangeRate);
  const totalOriginalPriceCNY = Math.round(totalOriginalPrice / exchangeRate);
  const discountAmountCNY = Math.round(discountAmount / exchangeRate);
  
  return (
    <section className={cn("bg-gray-50 rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        총 금액
      </h2>
      
      <div className="space-y-3">
        {/* Original price */}
        {discountAmount > 0 && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">정가 합계</span>
              <div className="text-right">
                <span className="text-gray-500 line-through">
                  ₩{totalOriginalPrice.toLocaleString('ko-KR')}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  (¥{totalOriginalPriceCNY.toLocaleString('zh-CN')})
                </span>
              </div>
            </div>
            
            {/* Discount */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">패키지 할인</span>
              <div className="text-right">
                <span className="font-medium text-red-600">
                  -₩{discountAmount.toLocaleString('ko-KR')}
                </span>
                <span className="text-xs text-red-600 ml-2">
                  (-¥{discountAmountCNY.toLocaleString('zh-CN')})
                </span>
                <span className="text-xs text-red-600 ml-1">
                  ({discountPercent}%)
                </span>
              </div>
            </div>
          </>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-300 my-3" />
        
        {/* Final total */}
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-gray-900">최종 금액</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-mint">
              ₩{totalFinalPrice.toLocaleString('ko-KR')}
            </div>
            <div className="text-lg font-semibold text-gray-700 mt-1">
              ≈ ¥{totalFinalPriceCNY.toLocaleString('zh-CN')}
            </div>
          </div>
        </div>
        
        {/* Exchange rate notice */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            * VAT 포함 가격 | 환율: 1위안(¥) = {exchangeRate}원(₩)
          </p>
        </div>
      </div>
      
      {/* Print only - large total for easy reading */}
      <div className="hidden print:block mt-6 p-4 bg-white border-2 border-gray-300 rounded">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">총 견적 금액</p>
          <p className="text-3xl font-bold text-gray-900">
            ₩{totalFinalPrice.toLocaleString('ko-KR')}
          </p>
          <p className="text-xl font-semibold text-gray-700 mt-1">
            ¥{totalFinalPriceCNY.toLocaleString('zh-CN')}
          </p>
        </div>
      </div>
    </section>
  );
}
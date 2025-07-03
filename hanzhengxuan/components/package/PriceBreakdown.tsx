'use client';

interface PriceBreakdownProps {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

export function PriceBreakdown({ 
  subtotal, 
  discount, 
  vat, 
  total 
}: PriceBreakdownProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };
  
  const discountPercent = Math.round((discount / subtotal) * 100);
  
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="font-semibold text-gray-900 mb-3">가격 상세</h4>
      
      <div className="space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">시술 정가</span>
          <span className="text-gray-900">₩{formatPrice(subtotal)}</span>
        </div>
        
        {/* Discount */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            패키지 할인 
            <span className="text-red-500 font-medium ml-1">
              ({discountPercent}%)
            </span>
          </span>
          <span className="text-red-500">-₩{formatPrice(discount)}</span>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-2" />
        
        {/* Package price */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">할인가</span>
          <span className="text-gray-900">₩{formatPrice(subtotal - discount)}</span>
        </div>
        
        {/* VAT */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (10%)</span>
          <span className="text-gray-900">+₩{formatPrice(vat)}</span>
        </div>
        
        {/* Total divider */}
        <div className="border-t border-gray-300 my-2" />
        
        {/* Total */}
        <div className="flex justify-between">
          <span className="font-semibold text-gray-900">최종 금액</span>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">
              ₩{formatPrice(total)}
            </div>
            <div className="text-xs text-gray-500">
              ≈ ¥{formatPrice(Math.round(total / 190))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
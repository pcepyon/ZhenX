'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface PackageItem {
  package_code: string;
  name_ko: string;
  name_cn?: string;
  price_tier: 'basic' | 'premium' | 'luxury';
  original_price: number;
  final_price: number;
  package_items?: Array<{
    treatment: {
      name_ko: string;
    };
  }>;
  treatments?: string[];
}

interface PackageSummaryProps {
  packages: PackageItem[];
  className?: string;
}

const tierColors = {
  basic: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    label: '베이직'
  },
  premium: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    label: '프리미엄'
  },
  luxury: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    label: '럭셔리'
  }
};

export function PackageSummary({ packages, className }: PackageSummaryProps) {
  const { totalOriginal, totalFinal, totalDiscount } = useMemo(() => {
    const original = packages.reduce((sum, pkg) => sum + (pkg.original_price || pkg.final_price), 0);
    const final = packages.reduce((sum, pkg) => sum + pkg.final_price, 0);
    return {
      totalOriginal: original,
      totalFinal: final,
      totalDiscount: original - final
    };
  }, [packages]);
  
  const discountPercent = totalOriginal > 0 
    ? Math.round((totalDiscount / totalOriginal) * 100)
    : 0;
  
  // Convert to CNY (1 CNY = 190 KRW)
  const exchangeRate = 190;
  const totalFinalCNY = Math.round(totalFinal / exchangeRate);
  
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200", className)}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">
          선택한 패키지 ({packages.length}개)
        </h3>
      </div>
      
      {/* Package list */}
      <div className="divide-y divide-gray-100">
        {packages.map((pkg) => {
          const tier = tierColors[pkg.price_tier] || tierColors.basic;
          const treatmentCount = pkg.package_items?.length || pkg.treatments?.length || 0;
          
          return (
            <div key={pkg.package_code} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {pkg.name_ko}
                    </h4>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
                      tier.bg,
                      tier.text
                    )}>
                      {tier.label}
                    </span>
                  </div>
                  {treatmentCount > 0 && (
                    <p className="text-sm text-gray-600">
                      {treatmentCount}개 시술 포함
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-gray-900">
                    ₩{pkg.final_price.toLocaleString('ko-KR')}
                  </p>
                  {pkg.original_price > pkg.final_price && (
                    <p className="text-sm text-gray-500 line-through">
                      ₩{pkg.original_price.toLocaleString('ko-KR')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Total summary */}
      <div className="px-5 py-4 bg-gray-50 rounded-b-xl">
        <div className="space-y-2">
          {/* Original total */}
          {totalDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">정가 합계</span>
              <span className="text-gray-500 line-through">
                ₩{totalOriginal.toLocaleString('ko-KR')}
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
          
          {/* Final total */}
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-gray-900">최종 금액</span>
            <div className="text-right">
              <div className="text-xl font-bold text-primary-mint">
                ₩{totalFinal.toLocaleString('ko-KR')}
              </div>
              <div className="text-sm text-gray-600">
                ≈ ¥{totalFinalCNY.toLocaleString('zh-CN')}
              </div>
            </div>
          </div>
          
          {/* VAT notice */}
          <p className="text-xs text-gray-500 mt-2">
            * VAT 포함 가격입니다
          </p>
        </div>
      </div>
    </div>
  );
}
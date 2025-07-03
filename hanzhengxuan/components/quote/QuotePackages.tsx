import { cn } from '@/lib/utils';
import type { QuotePackage } from '@/hooks/api/useQuote';

interface QuotePackagesProps {
  packages: QuotePackage[];
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

export function QuotePackages({ packages, className }: QuotePackagesProps) {
  return (
    <section className={cn("", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        패키지 상세 내역
      </h2>
      
      <div className="space-y-4">
        {packages.map((pkg, index) => {
          const tier = tierColors[pkg.price_tier] || tierColors.basic;
          const discountPercent = pkg.original_price > pkg.final_price
            ? Math.round((1 - pkg.final_price / pkg.original_price) * 100)
            : 0;
          
          return (
            <div 
              key={pkg.package_code}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Package header */}
              <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-500">
                        패키지 {index + 1}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        tier.bg,
                        tier.text
                      )}>
                        {tier.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{pkg.name_ko}</h3>
                    <p className="text-sm text-gray-600">{pkg.name_cn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {Math.floor(pkg.duration_minutes / 60)}시간 {pkg.duration_minutes % 60}분
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Treatments list */}
              <div className="px-5 py-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  구성 시술 ({pkg.treatments.length}개)
                </h4>
                <div className="space-y-2">
                  {pkg.treatments.map((treatment, tIndex) => (
                    <div 
                      key={tIndex}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700">{treatment.name_ko}</span>
                        <span className="text-gray-500 text-xs">
                          {treatment.name_cn}
                        </span>
                      </div>
                      {treatment.quantity > 1 && (
                        <span className="text-gray-600">
                          {treatment.quantity}회
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price info */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    {discountPercent > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ₩{pkg.original_price.toLocaleString('ko-KR')}
                        </span>
                        <span className="text-sm font-medium text-red-600">
                          {discountPercent}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₩{pkg.final_price.toLocaleString('ko-KR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      ≈ ¥{Math.round(pkg.final_price / 190).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
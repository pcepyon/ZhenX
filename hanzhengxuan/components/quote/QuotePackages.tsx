'use client';

import { cn } from '@/lib/utils';
import type { QuotePackage } from '@/hooks/api/useQuote';
import { motion } from 'framer-motion';
import { Package, Clock } from 'lucide-react';

interface QuotePackagesProps {
  packages: QuotePackage[];
  className?: string;
}

const tierColors = {
  basic: {
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    icon: '💎',
    label: '베이직'
  },
  premium: {
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    icon: '✨',
    label: '프리미엄'
  },
  luxury: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    icon: '👑',
    label: '럭셔리'
  },
  ultra: {
    gradient: 'from-amber-500 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    icon: '🔥',
    label: '울트라'
  }
};

export function QuotePackages({ packages, className }: QuotePackagesProps) {
  if (!packages || packages.length === 0) {
    return null;
  }
  
  return (
    <section className={cn("", className)}>
      <motion.div 
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-2.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
          <Package className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-lg font-medium text-gray-800">
          패키지 상세 내역
        </h2>
      </motion.div>
      
      <div className="space-y-4">
        {packages.map((pkg, index) => {
          const tier = tierColors[pkg.price_tier] || tierColors.basic;
          const originalPrice = pkg.original_price || 0;
          const finalPrice = pkg.final_price || 0;
          const discountPercent = originalPrice > finalPrice && originalPrice > 0
            ? Math.round((1 - finalPrice / originalPrice) * 100)
            : 0;
          
          return (
            <motion.div 
              key={pkg.package_code}
              className={cn(
                "bg-white/80 backdrop-blur-sm border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all",
                tier.border
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Package header */}
              <div className={cn("px-5 py-4 bg-gradient-to-br border-b", tier.bg, tier.border)}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span 
                        className="text-sm text-gray-600 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        패키지 {index + 1}
                      </motion.span>
                      <motion.span 
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r shadow-sm",
                          tier.gradient
                        )}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{tier.icon}</span>
                        {tier.label}
                      </motion.span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{pkg.name_ko}</h3>
                    <p className="text-sm text-gray-600">{pkg.name_cn}</p>
                  </div>
                  <div className="text-right">
                    {pkg.duration_minutes && (
                      <motion.div 
                        className="flex items-center gap-1.5 text-sm text-gray-600"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="w-4 h-4" />
                        <p className="font-medium">
                          {Math.floor(pkg.duration_minutes / 60)}시간 {pkg.duration_minutes % 60}분
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Treatments list */}
              <div className="px-5 py-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  구성 시술
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {pkg.treatments?.length || 0}개
                  </span>
                </h4>
                <div className="space-y-2">
                  {pkg.treatments?.map((treatment, tIndex) => (
                    <motion.div 
                      key={tIndex}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + tIndex * 0.05 + 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-r", tier.gradient)} />
                        <span className="text-gray-700 font-medium">{treatment.name_ko}</span>
                        <span className="text-gray-500 text-xs">
                          {treatment.name_cn}
                        </span>
                      </div>
                      {treatment.quantity > 1 && (
                        <span className="text-gray-600 bg-white px-2 py-0.5 rounded text-sm font-medium">
                          {treatment.quantity}회
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Price info */}
              <div className={cn("px-5 py-4 bg-gradient-to-br border-t", tier.bg, tier.border)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    {discountPercent > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ₩{originalPrice.toLocaleString('ko-KR')}
                        </span>
                        <motion.span 
                          className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {discountPercent}% OFF
                        </motion.span>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={cn("text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r", tier.gradient)}>
                      ₩{finalPrice.toLocaleString('ko-KR')}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      ≈ ¥{Math.round(finalPrice / 190).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
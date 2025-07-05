'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown } from 'lucide-react';

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
    <motion.section 
      className={cn("bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div 
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
          <Calculator className="w-5 h-5 text-emerald-600" />
        </div>
        <h2 className="text-lg font-medium text-gray-800">
          총 금액
        </h2>
      </motion.div>
      
      <div className="space-y-3">
        {/* Original price */}
        {discountAmount > 0 && (
          <>
            <motion.div 
              className="flex justify-between items-center bg-white/60 rounded-xl px-4 py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-gray-600">정가 합계</span>
              <div className="text-right">
                <span className="text-gray-500 line-through">
                  ₩{totalOriginalPrice.toLocaleString('ko-KR')}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  (¥{totalOriginalPriceCNY.toLocaleString('zh-CN')})
                </span>
              </div>
            </motion.div>
            
            {/* Discount */}
            <motion.div 
              className="flex justify-between items-center bg-white/60 rounded-xl px-4 py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-600 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                패키지 할인
              </span>
              <div className="text-right">
                <span className="font-medium text-red-600">
                  -₩{discountAmount.toLocaleString('ko-KR')}
                </span>
                <span className="text-xs text-red-600 ml-2">
                  (-¥{discountAmountCNY.toLocaleString('zh-CN')})
                </span>
                <motion.span 
                  className="text-xs text-white bg-red-500 px-2 py-0.5 rounded ml-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {discountPercent}%
                </motion.span>
              </div>
            </motion.div>
          </>
        )}
        
        {/* Divider */}
        <div className="border-t-2 border-emerald-200 my-4" />
        
        {/* Final total */}
        <motion.div 
          className="bg-white rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-gray-800 text-lg">최종 금액</span>
            <div className="text-right">
              <motion.div 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ₩{totalFinalPrice.toLocaleString('ko-KR')}
              </motion.div>
              <div className="text-lg font-semibold text-gray-700 mt-1">
                ≈ ¥{totalFinalPriceCNY.toLocaleString('zh-CN')}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Exchange rate notice */}
        <motion.div 
          className="mt-4 pt-3 border-t border-emerald-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            VAT 포함 가격
            <span className="text-gray-400">|</span>
            환율: 1위안(¥) = {exchangeRate}원(₩)
          </p>
        </motion.div>
      </div>
      
      {/* Print only - large total for easy reading */}
      <div className="hidden print:block mt-6 p-4 bg-white border-2 border-emerald-300 rounded">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">총 견적 금액</p>
          <p className="text-3xl font-bold text-emerald-600">
            ₩{totalFinalPrice.toLocaleString('ko-KR')}
          </p>
          <p className="text-xl font-semibold text-gray-700 mt-1">
            ¥{totalFinalPriceCNY.toLocaleString('zh-CN')}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
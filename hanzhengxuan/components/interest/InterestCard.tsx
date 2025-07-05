'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, X, Check } from 'lucide-react';

interface InterestCardProps {
  packageCode: string;
  name: string;
  priceTier: 'basic' | 'premium' | 'luxury' | 'ultra';
  originalPrice: number;
  finalPrice: number;
  treatments: string[];
  onRemove: () => void;
  onViewDetail: () => void;
  selected?: boolean;
  onSelect?: () => void;
}

const tierStyles = {
  basic: { 
    color: 'from-blue-500 to-indigo-500', 
    label: '베이직',
    bg: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    icon: '💎'
  },
  premium: { 
    color: 'from-emerald-500 to-teal-500', 
    label: '프리미엄',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    icon: '✨'
  },
  luxury: { 
    color: 'from-purple-500 to-pink-500', 
    label: '럭셔리',
    bg: 'from-purple-50 to-pink-50',
    border: 'border-purple-200',
    icon: '👑'
  },
  ultra: { 
    color: 'from-amber-500 to-orange-500', 
    label: '울트라',
    bg: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    icon: '🔥'
  }
};

export function InterestCard({
  packageCode,
  name,
  priceTier,
  originalPrice,
  finalPrice,
  treatments,
  onRemove,
  onViewDetail,
  selected = false,
  onSelect
}: InterestCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const tierStyle = tierStyles[priceTier] || tierStyles.basic;
  const discountPercent = Math.round((1 - finalPrice / originalPrice) * 100);
  
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showConfirm) {
      onRemove();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Auto-hide confirm after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };
  
  const handleCancelRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };
  
  return (
    <motion.div 
      className={cn(
        "relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 group",
        selected ? "border-emerald-400 shadow-lg" : tierStyle.border,
        "hover:shadow-xl"
      )}
      whileHover={{ scale: 1.01 }}
    >
      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-20",
        tierStyle.bg
      )} />
      
      {/* Selection checkbox (if onSelect provided) */}
      <AnimatePresence>
        {onSelect && (
          <motion.div 
            className="absolute top-4 left-4 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                selected 
                  ? "bg-emerald-500 border-emerald-500" 
                  : "bg-white border-gray-300 hover:border-emerald-400"
              )}
            >
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={cn(
        "relative p-5",
        onSelect && "pl-14"
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Package name & tier */}
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-lg text-gray-900 truncate">
                {name}
              </h3>
              <motion.span 
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r shadow-sm",
                  tierStyle.color
                )}
                whileHover={{ scale: 1.05 }}
              >
                <span>{tierStyle.icon}</span>
                {tierStyle.label}
              </motion.span>
            </div>
            
            {/* Treatments */}
            <div className="flex flex-wrap gap-2 mb-4">
              {treatments.slice(0, 3).map((treatment, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                >
                  {treatment}
                </motion.span>
              ))}
              {treatments.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                  +{treatments.length - 3}개
                </span>
              )}
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ₩{finalPrice.toLocaleString('ko-KR')}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₩{originalPrice.toLocaleString('ko-KR')}
                  </span>
                  <motion.span 
                    className="inline-flex items-center text-sm font-bold text-red-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {discountPercent}% OFF
                  </motion.span>
                </>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-2">
            {/* View detail button */}
            <motion.button
              onClick={onViewDetail}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group/btn"
              aria-label="상세보기"
            >
              <Eye className="w-5 h-5 text-gray-600 group-hover/btn:text-gray-800" />
            </motion.button>
            
            {/* Remove button */}
            <AnimatePresence mode="wait">
              {!showConfirm ? (
                <motion.button
                  key="delete"
                  onClick={handleRemoveClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl transition-all group/btn"
                  aria-label="삭제"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Trash2 className="w-5 h-5 text-red-500 group-hover/btn:text-red-600" />
                </motion.button>
              ) : (
                <motion.div 
                  key="confirm"
                  className="flex gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <motion.button
                    onClick={handleRemoveClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                  >
                    삭제
                  </motion.button>
                  <motion.button
                    onClick={handleCancelRemove}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
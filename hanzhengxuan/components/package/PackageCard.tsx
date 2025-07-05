'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MatchBadge } from './MatchBadge';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { Heart, Sparkles, TrendingDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  packageCode: string;
  name: string;
  priceTier: 'basic' | 'premium' | 'luxury' | 'ultra';
  matchScore: number;
  originalPrice: number;
  finalPrice: number;
  composition?: string[];
  highlights?: string[];
  onDetailClick?: () => void;
  rank?: number;
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

export function PackageCard({
  packageCode,
  name,
  priceTier,
  matchScore,
  originalPrice,
  finalPrice,
  composition = [],
  highlights = [],
  onDetailClick,
  rank
}: PackageCardProps) {
  const { addInterest, removeInterest, isInterested } = useAppStore();
  const [isLiked, setIsLiked] = useState(isInterested(packageCode));
  
  const tierStyle = tierStyles[priceTier];
  const discountPercent = Math.round((1 - finalPrice / originalPrice) * 100);
  
  const handleInterestToggle = () => {
    if (isLiked) {
      removeInterest(packageCode);
    } else {
      addInterest(packageCode);
    }
    setIsLiked(!isLiked);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };
  
  return (
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Rank badge for top 3 */}
      {rank && rank <= 3 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "absolute -top-3 -left-3 z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg",
            rank === 1 && "bg-gradient-to-br from-yellow-400 to-amber-500",
            rank === 2 && "bg-gradient-to-br from-gray-400 to-gray-600",
            rank === 3 && "bg-gradient-to-br from-orange-400 to-orange-600"
          )}
        >
          {rank}위
        </motion.div>
      )}
      
      <div className={cn(
        "relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300",
        tierStyle.border,
        "hover:shadow-2xl hover:border-opacity-80"
      )}>
        {/* Gradient background */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-30",
          tierStyle.bg
        )} />
        
        {/* Tier indicator bar */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
          tierStyle.color
        )} />
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
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
                <MatchBadge matchScore={matchScore} size="sm" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 pr-2">{name}</h3>
            </div>
            
            {/* Interest button */}
            <motion.button
              onClick={handleInterestToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-2.5 rounded-full transition-all",
                isLiked ? "bg-red-50" : "bg-gray-50 hover:bg-gray-100"
              )}
              aria-label={isLiked ? '관심 제거' : '관심 추가'}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
                  )}
                />
              </motion.div>
            </motion.button>
          </div>
          
          {/* Composition */}
          {composition.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 mb-2">시술 구성</p>
              <div className="flex flex-wrap gap-2">
                {composition.slice(0, 3).map((item, index) => (
                  <span 
                    key={index} 
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {item}
                  </span>
                ))}
                {composition.length > 3 && (
                  <span className="text-sm px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                    +{composition.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-5 space-y-2">
              {highlights.slice(0, 3).map((highlight, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Price */}
          <div className="mb-5 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₩{formatPrice(finalPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₩{formatPrice(originalPrice)}
                      </span>
                      <motion.span 
                        className="inline-flex items-center gap-1 text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <TrendingDown className="w-3 h-3" />
                        {discountPercent}%
                      </motion.span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ≈ ¥{formatPrice(Math.round(finalPrice / 190))} (참고용)
                </p>
              </div>
              {matchScore >= 85 && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🎯
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <Button
            variant="primary"
            size="md"
            onClick={onDetailClick}
            className={cn(
              "w-full bg-gradient-to-r text-white hover:shadow-lg transform hover:scale-[1.02] transition-all group",
              tierStyle.color
            )}
          >
            <span className="flex items-center justify-center gap-2">
              자세히 보기
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
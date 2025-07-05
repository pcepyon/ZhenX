'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PriceTierFilterProps {
  selectedTier: string;
  onTierChange: (tier: string) => void;
  availableTiers: string[];
}

const tierInfo = {
  all: { 
    label: '전체', 
    color: 'from-gray-500 to-gray-600',
    bg: 'from-gray-50 to-gray-100',
    icon: '🌟'
  },
  basic: { 
    label: '베이직', 
    color: 'from-blue-500 to-indigo-500',
    bg: 'from-blue-50 to-indigo-50',
    icon: '💎'
  },
  premium: { 
    label: '프리미엄', 
    color: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-50 to-teal-50',
    icon: '✨'
  },
  luxury: { 
    label: '럭셔리', 
    color: 'from-purple-500 to-pink-500',
    bg: 'from-purple-50 to-pink-50',
    icon: '👑'
  },
  ultra: { 
    label: '울트라', 
    color: 'from-amber-500 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
    icon: '🔥'
  }
};

export function PriceTierFilter({ 
  selectedTier, 
  onTierChange, 
  availableTiers 
}: PriceTierFilterProps) {
  const allTiers = ['all', ...availableTiers];
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-600 mb-3">가격대 필터</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allTiers.map((tier, index) => {
          const info = tierInfo[tier as keyof typeof tierInfo];
          const isSelected = selectedTier === tier;
          
          return (
            <motion.button
              key={tier}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTierChange(tier)}
              className={cn(
                "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap overflow-hidden",
                isSelected 
                  ? "text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {/* Gradient background for selected */}
              {isSelected && (
                <motion.div
                  className={cn("absolute inset-0 bg-gradient-to-r", info.color)}
                  layoutId="tierFilter"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Content */}
              <span className="relative flex items-center gap-1.5">
                <span className={cn(
                  "transition-transform",
                  isSelected && "scale-110"
                )}>
                  {info.icon}
                </span>
                {info.label}
                {tier !== 'all' && isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs"
                  >
                    선택됨
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
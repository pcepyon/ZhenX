'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InterestCardProps {
  packageCode: string;
  name: string;
  priceTier: 'basic' | 'premium' | 'luxury';
  originalPrice: number;
  finalPrice: number;
  treatments: string[];
  onRemove: () => void;
  onViewDetail: () => void;
  selected?: boolean;
  onSelect?: () => void;
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
  const tier = tierColors[priceTier] || tierColors.basic;
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
    <div className={cn(
      "relative bg-white rounded-xl p-4 border-2 transition-all duration-200",
      selected ? "border-primary-mint bg-primary-mint-light/5" : "border-gray-200"
    )}>
      {/* Selection checkbox (if onSelect provided) */}
      {onSelect && (
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="w-5 h-5 rounded border-gray-300 text-primary-mint focus:ring-primary-mint"
          />
        </div>
      )}
      
      <div className={cn(
        "flex items-start justify-between gap-4",
        onSelect && "pl-8"
      )}>
        <div className="flex-1 min-w-0">
          {/* Package name & tier */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              tier.bg,
              tier.text
            )}>
              {tier.label}
            </span>
          </div>
          
          {/* Treatments */}
          <div className="flex flex-wrap gap-1 mb-3">
            {treatments.slice(0, 3).map((treatment, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
              >
                {treatment}
              </span>
            ))}
            {treatments.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{treatments.length - 3}개
              </span>
            )}
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₩{finalPrice.toLocaleString('ko-KR')}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₩{originalPrice.toLocaleString('ko-KR')}
                </span>
                <span className="text-sm font-medium text-red-500">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2">
          {/* View detail button */}
          <button
            onClick={onViewDetail}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="상세보기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          </button>
          
          {/* Remove button */}
          {!showConfirm ? (
            <button
              onClick={handleRemoveClick}
              className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              aria-label="삭제"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={handleRemoveClick}
                className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
              <button
                onClick={handleCancelRemove}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
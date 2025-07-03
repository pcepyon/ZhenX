'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MatchBadge } from './MatchBadge';
import { useAppStore } from '@/store/useAppStore';

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
}

const tierStyles = {
  basic: { 
    color: 'bg-tier-basic', 
    label: '베이직',
    gradient: 'from-tier-basic/20 to-tier-basic/5' 
  },
  premium: { 
    color: 'bg-tier-premium', 
    label: '프리미엄',
    gradient: 'from-tier-premium/20 to-tier-premium/5'
  },
  luxury: { 
    color: 'bg-tier-luxury', 
    label: '럭셔리',
    gradient: 'from-tier-luxury/20 to-tier-luxury/5'
  },
  ultra: { 
    color: 'bg-tier-ultra', 
    label: '울트라',
    gradient: 'from-tier-ultra/20 to-tier-ultra/5'
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
  onDetailClick
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
    <div className={`relative bg-gradient-to-br ${tierStyle.gradient} rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300`}>
      {/* Tier bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${tierStyle.color}`} />
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold ${tierStyle.color} text-white px-2 py-0.5 rounded`}>
                {tierStyle.label}
              </span>
              <MatchBadge matchScore={matchScore} size="sm" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          </div>
          
          {/* Interest button */}
          <button
            onClick={handleInterestToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={isLiked ? '관심 제거' : '관심 추가'}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={isLiked ? 'currentColor' : 'none'}
              className={isLiked ? 'text-red-500' : 'text-gray-400'}
            >
              <path 
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        {/* Composition */}
        {composition.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">구성</p>
            <p className="text-sm font-medium text-gray-900">
              {composition.slice(0, 3).join(' + ')}
              {composition.length > 3 && ` 외 ${composition.length - 3}개`}
            </p>
          </div>
        )}
        
        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary-mint mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₩{formatPrice(finalPrice)}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₩{formatPrice(originalPrice)}
                </span>
                <span className="text-sm font-semibold text-red-500">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            ≈ ¥{formatPrice(Math.round(finalPrice / 190))} (참고용)
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={onDetailClick}
            className="flex-1"
          >
            자세히 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
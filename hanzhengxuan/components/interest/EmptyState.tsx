'use client';

import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onExplore: () => void;
}

export function EmptyState({ onExplore }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-5">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none"
          className="text-gray-400"
        >
          <path 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        아직 관심 패키지가 없어요
      </h2>
      
      <p className="text-gray-600 text-center mb-6 max-w-sm">
        마음에 드는 패키지를 추가하고<br />
        한번에 비교해보세요
      </p>
      
      <Button
        variant="primary"
        size="lg"
        onClick={onExplore}
      >
        패키지 둘러보기
      </Button>
    </div>
  );
}
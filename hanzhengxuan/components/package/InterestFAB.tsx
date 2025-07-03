'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export function InterestFAB() {
  const router = useRouter();
  const interestedPackages = useAppStore((state) => state.interestedPackages);
  const count = interestedPackages.length;
  
  if (count === 0) return null;
  
  const handleClick = () => {
    router.push('/interests');
  };
  
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-primary-mint text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 z-50"
      aria-label={`관심 패키지 ${count}개 보기`}
    >
      <div className="relative">
        {/* Icon */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          className="w-6 h-6"
        >
          <path 
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Badge */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </div>
      </div>
      
      {/* Text (visible on desktop) */}
      <span className="ml-2 hidden sm:inline-block font-medium">
        견적받기
      </span>
    </button>
  );
}
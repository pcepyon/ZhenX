'use client';

import { useEffect, useState } from 'react';

interface CompletionAnimationProps {
  onComplete?: () => void;
}

export function CompletionAnimation({ onComplete }: CompletionAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Call onComplete after animation
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center">
      <div 
        className={`text-center transition-all duration-500 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Checkmark circle */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-primary-mint rounded-full flex items-center justify-center">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none"
              className={`transition-all duration-300 delay-300 ${
                isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <path 
                d="M16 24L22 30L32 18" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Animated rings */}
          <div className={`absolute inset-0 rounded-full border-4 border-primary-mint animate-ping`} />
          <div className={`absolute inset-0 rounded-full border-4 border-primary-mint animate-ping animation-delay-200`} />
        </div>
        
        {/* Success message */}
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          완료!
        </h2>
        <p className="mt-2 text-gray-600">
          맞춤 패키지를 찾고 있어요
        </p>
      </div>
      
      <style jsx>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}
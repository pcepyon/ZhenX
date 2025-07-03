'use client';

import { useEffect, useState } from 'react';

interface SuccessAnimationProps {
  onAnimationComplete?: () => void;
}

export function SuccessAnimation({ onAnimationComplete }: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  
  useEffect(() => {
    // Start animation after mount
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Animate checkmark path
    const pathTimer = setInterval(() => {
      setPathLength(prev => {
        if (prev >= 1) {
          clearInterval(pathTimer);
          onAnimationComplete?.();
          return 1;
        }
        return prev + 0.02;
      });
    }, 16);
    
    // Trigger confetti effect
    if (typeof window !== 'undefined') {
      // Simple confetti simulation with CSS
      const confettiContainer = document.createElement('div');
      confettiContainer.className = 'confetti-container';
      confettiContainer.innerHTML = Array.from({ length: 50 }, (_, i) => 
        `<div class="confetti" style="
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 0.5}s;
          background-color: ${['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6'][Math.floor(Math.random() * 5)]};
        "></div>`
      ).join('');
      
      document.body.appendChild(confettiContainer);
      
      setTimeout(() => {
        confettiContainer.remove();
      }, 3000);
    }
    
    return () => {
      clearTimeout(showTimer);
      clearInterval(pathTimer);
    };
  }, [onAnimationComplete]);
  
  return (
    <>
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear;
        }
      `}</style>
      
      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="relative w-32 h-32 mx-auto">
          {/* Circle background */}
          <div className="absolute inset-0 bg-primary-mint rounded-full animate-pulse opacity-20" />
          
          {/* Circle border */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 128 128"
            fill="none"
          >
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${377 * pathLength} 377`}
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Checkmark */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 128 128"
            fill="none"
          >
            <path
              d="M40 64L56 80L88 48"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${70 * pathLength} 70`}
              className="transition-all duration-800 delay-200"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
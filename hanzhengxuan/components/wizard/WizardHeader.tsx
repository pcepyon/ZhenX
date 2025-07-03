'use client';

import { useRouter } from 'next/navigation';
import { ProgressDots } from '@/components/ui/Progress';

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function WizardHeader({ currentStep, totalSteps, onBack }: WizardHeaderProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 z-40">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="뒤로가기"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">
            {currentStep}/{totalSteps}
          </span>
          <ProgressDots steps={totalSteps} current={currentStep} />
        </div>
        
        {/* Placeholder for alignment */}
        <div className="w-10" />
      </div>
    </header>
  );
}
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs';
import { useCreateRecommendations } from '@/hooks/api/useRecommendations';
import { PersonalFactorItem } from '@/components/wizard/PersonalFactorItem';
import { WizardFooter } from '@/components/wizard/WizardFooter';
import { CompletionAnimation } from '@/components/wizard/CompletionAnimation';

const personalFactors = [
  { id: 'budget_conscious', label: '가격 부담 최소화', description: '합리적인 가격대 우선', icon: '💰' },
  { id: 'one_day_preferred', label: '하루 완성 선호', description: '모든 시술 당일 완료', icon: '⏱️' },
  { id: 'immediate_results', label: '즉각 효과 원함', description: '바로 눈에 보이는 변화', icon: '✨' },
  { id: 'long_term_results', label: '장기 지속 원함', description: '오래 유지되는 효과', icon: '📅' },
  { id: 'quick_recovery', label: '짧은 회복기간', description: '일상 빠른 복귀', icon: '🏃' }
];

export default function WizardStep3() {
  const router = useRouter();
  const { 
    sessionId,
    selectedCategory,
    selectedConcern,
    personalFactors: selectedFactors,
    togglePersonalFactor
  } = useAppStore();
  
  const [showCompletion, setShowCompletion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { mutate: saveInputs } = useSaveWizardInput();
  const { mutate: createRecommendations } = useCreateRecommendations();

  // Redirect if previous steps not completed
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    } else if (!selectedCategory) {
      router.push('/wizard/step1');
    } else if (!selectedConcern) {
      router.push('/wizard/step2');
    }
  }, [sessionId, selectedCategory, selectedConcern, router]);

  const handleComplete = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Save personal factors (preferences) for step 3
      const personalFactorData = {
        budget_range: selectedFactors.find(f => f.id === 'budget_conscious')?.checked ? 'economy' : 'standard',
        recovery_time: selectedFactors.find(f => f.id === 'quick_recovery')?.checked ? 'minimal' : 'moderate',
        stay_duration: selectedFactors.find(f => f.id === 'one_day_preferred')?.checked ? '1_day' : '3_days'
      };
      
      saveInputs({
        step_number: 3,
        selected_concerns: personalFactorData
      });
      
      // Show completion animation
      setShowCompletion(true);
      
      // Request recommendations
      setTimeout(() => {
        createRecommendations(undefined, {
          onSuccess: () => {
            router.push('/loading');
          },
          onError: (error) => {
            console.error('Failed to create recommendations:', error);
            setShowCompletion(false);
            setIsSubmitting(false);
            // TODO: Show error toast
          }
        });
      }, 1000);
      
    } catch (error) {
      console.error('Failed to save inputs:', error);
      setIsSubmitting(false);
      // TODO: Show error toast
    }
  };

  const handleAnimationComplete = () => {
    // Animation complete callback if needed
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        
        {/* Main content */}
        <main className="px-5 py-6 pb-24">
          <div className="max-w-md mx-auto">
            {/* Question */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              마지막! 너의 상황을 알려줘
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              선택사항이야. 더 정확한 추천을 위해서!
            </p>
            
            {/* Personal factors */}
            <div className="space-y-3">
              {personalFactors.map((factor) => {
                const isChecked = selectedFactors.find(f => f.id === factor.id)?.checked || false;
                
                return (
                  <PersonalFactorItem
                    key={factor.id}
                    {...factor}
                    checked={isChecked}
                    onChange={() => togglePersonalFactor(factor.id)}
                  />
                );
              })}
            </div>
            
            {/* Skip option */}
            <div className="mt-6 text-center">
              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                건너뛰기
              </button>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <WizardFooter 
          onNext={handleComplete}
          disabled={isSubmitting}
          loading={isSubmitting}
          buttonText="완료"
        />
      </div>
      
      {/* Completion animation overlay */}
      {showCompletion && (
        <CompletionAnimation onComplete={handleAnimationComplete} />
      )}
    </>
  );
}
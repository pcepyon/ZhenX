'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs';
import { useCreateRecommendations } from '@/hooks/api/useRecommendations';
import { PersonalFactorItem } from '@/components/wizard/PersonalFactorItem';
import { WizardFooter } from '@/components/wizard/WizardFooter';
import { CompletionAnimation } from '@/components/wizard/CompletionAnimation';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const personalFactors = [
  { id: 'budget_conscious', label: '가격 부담 최소화', description: '합리적인 가격대 우선', icon: '💰', color: 'from-blue-500 to-indigo-500' },
  { id: 'one_day_preferred', label: '하루 완성 선호', description: '모든 시술 당일 완료', icon: '⏱️', color: 'from-emerald-500 to-teal-500' },
  { id: 'immediate_results', label: '즉각 효과 원함', description: '바로 눈에 보이는 변화', icon: '✨', color: 'from-rose-500 to-pink-500' },
  { id: 'long_term_results', label: '장기 지속 원함', description: '오래 유지되는 효과', icon: '📅', color: 'from-indigo-500 to-purple-500' },
  { id: 'quick_recovery', label: '짧은 회복기간', description: '일상 빠른 복귀', icon: '🏃', color: 'from-amber-500 to-orange-500' }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            initial={{ width: '66.66%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Main content */}
        <main className="px-5 py-8 pb-32">
          <motion.div 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Step indicator */}
            <motion.div 
              className="flex items-center gap-2 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Step 3/3
              </span>
              <span className="text-xs text-gray-500">개인 선호도</span>
            </motion.div>

            {/* Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
                마지막! 너의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">상황</span>을 알려줘
              </h1>
              <p className="text-lg text-gray-600 mb-8 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" />
                선택사항이야. 더 정확한 추천을 위해서!
              </p>
            </motion.div>
            
            {/* Personal factors */}
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {personalFactors.map((factor, index) => {
                const isChecked = selectedFactors.find(f => f.id === factor.id)?.checked || false;
                
                return (
                  <motion.div
                    key={factor.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <PersonalFactorItem
                      {...factor}
                      checked={isChecked}
                      onChange={() => togglePersonalFactor(factor.id)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Skip option */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
              >
                건너뛰기
              </button>
            </motion.div>
          </motion.div>
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
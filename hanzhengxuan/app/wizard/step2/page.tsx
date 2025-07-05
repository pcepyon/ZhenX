'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useConcerns } from '@/hooks/api/useConcerns';
import { useCategories } from '@/hooks/api/useCategories';
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs';
import { ConcernSection } from '@/components/wizard/ConcernSection';
import { WizardFooter } from '@/components/wizard/WizardFooter';
import { Concern } from '@/hooks/api/useConcerns';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function WizardStep2() {
  const router = useRouter();
  const { 
    sessionId,
    selectedCategory, 
    selectedConcern,
    setConcern
  } = useAppStore();

  // Fetch categories to get category info
  const { data: categories } = useCategories();
  
  // Fetch concerns for selected category
  const { data: concerns = [], isLoading, error } = useConcerns(
    selectedCategory ? [selectedCategory] : []
  );
  
  const { mutate: saveInput, isPending: isSaving } = useSaveWizardInput();

  // Redirect to step1 if no category selected
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    } else if (!selectedCategory) {
      router.push('/wizard/step1');
    }
  }, [sessionId, selectedCategory, router]);

  const handleToggleConcern = (concern: Concern) => {
    // If same concern is clicked, deselect it
    if (selectedConcern?.id === concern.id) {
      setConcern(null);
    } else {
      // Convert API concern to store concern format
      setConcern({
        id: concern.id,
        categoryId: concern.category_id,
        name: concern.name,
        severity: 3 // Default severity
      });
    }
  };

  const handleNext = () => {
    if (selectedConcern) {
      // Save the selected concern
      saveInput(
        {
          step_number: 2,
          selected_concerns: [selectedConcern.id]
        },
        {
          onSuccess: () => {
            router.push('/wizard/step3');
          },
          onError: (error) => {
            console.error('Failed to save concern:', error);
            // Still navigate even if save fails
            router.push('/wizard/step3');
          }
        }
      );
    }
  };

  const canProceed = !!selectedConcern;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">고민 목록을 불러오는 중...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <p className="text-red-500 mb-4">오류가 발생했습니다</p>
          <button 
            onClick={() => router.push('/wizard/step1')}
            className="text-sm text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
          >
            이전 단계로 돌아가기
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: '33.33%' }}
          animate={{ width: '66.66%' }}
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
              Step 2/3
            </span>
            <span className="text-xs text-gray-500">관심사 선택</span>
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
              구체적으로 어떤 부분이 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">고민</span>이야?
            </h1>
            <p className="text-lg text-gray-600 mb-8 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" />
              가장 고민되는 부분을 하나 선택해주세요
            </p>
          </motion.div>
          
          {/* Concern section for selected category */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ConcernSection
                key={selectedCategory}
                categoryId={selectedCategory}
                categoryName=""
                categoryIcon=""
                concerns={concerns}
                selectedConcerns={selectedConcern ? [selectedConcern] : []}
                onToggleConcern={handleToggleConcern}
              />
            </motion.div>
          )}
          
          {/* Selection indicator */}
          {selectedConcern && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-base text-gray-600 bg-white/80 backdrop-blur-sm inline-block px-4 py-2 rounded-full shadow-sm">
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                  {selectedConcern.name}
                </span>을(를) 선택했어요 🎯
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      
      {/* Footer */}
      <WizardFooter 
        onNext={handleNext} 
        disabled={!canProceed || isSaving}
        loading={isSaving}
      />
    </div>
  );
}
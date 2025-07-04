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
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
            <p className="mt-2 text-sm text-gray-600">고민 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-2">오류가 발생했습니다</p>
            <button 
              onClick={() => router.push('/wizard/step1')}
              className="text-sm text-primary-mint underline"
            >
              이전 단계로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main content */}
      <main className="px-5 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Question */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            구체적으로 어떤 부분이 고민이야?
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            가장 고민되는 부분을 하나 선택해주세요
          </p>
          
          {/* Concern section for selected category */}
          {selectedCategory && (
            <ConcernSection
              key={selectedCategory}
              categoryId={selectedCategory}
              categoryName=""
              categoryIcon=""
              concerns={concerns}
              selectedConcerns={selectedConcern ? [selectedConcern] : []}
              onToggleConcern={handleToggleConcern}
            />
          )}
          
          {/* Selection indicator */}
          {selectedConcern && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary-mint">
                  {selectedConcern.name}
                </span>을(를) 선택했어요
              </p>
            </div>
          )}
        </div>
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
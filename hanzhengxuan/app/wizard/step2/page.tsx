'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useConcerns } from '@/hooks/api/useConcerns';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { ConcernSection } from '@/components/wizard/ConcernSection';
import { WizardFooter } from '@/components/wizard/WizardFooter';
import { Concern } from '@/hooks/api/useConcerns';

export default function WizardStep2() {
  const router = useRouter();
  const { 
    sessionId,
    selectedCategories, 
    selectedConcerns,
    toggleConcern
  } = useAppStore();

  // Fetch concerns for selected categories
  const { data: concerns = [], isLoading, error } = useConcerns(selectedCategories);

  // Redirect to step1 if no categories selected
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    } else if (selectedCategories.length === 0) {
      router.push('/wizard/step1');
    }
  }, [sessionId, selectedCategories, router]);

  const handleToggleConcern = (concern: Concern) => {
    // Convert API concern to store concern format
    toggleConcern({
      id: concern.id,
      categoryId: concern.category_id,
      name: concern.name,
      severity: 3 // Default severity
    });
  };

  const handleNext = () => {
    if (selectedConcerns.length > 0) {
      router.push('/wizard/step3');
    }
  };

  const canProceed = selectedConcerns.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <WizardHeader currentStep={2} totalSteps={3} />
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
        <WizardHeader currentStep={2} totalSteps={3} />
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
      <WizardHeader currentStep={2} totalSteps={3} />
      
      {/* Main content */}
      <main className="px-5 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Question */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            구체적으로 어떤 부분이 고민이야?
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            해당하는 고민을 모두 선택해줘 (복수 선택 가능)
          </p>
          
          {/* Concern sections by category */}
          {selectedCategories.map((categoryId) => (
            <ConcernSection
              key={categoryId}
              categoryId={categoryId}
              categoryName=""
              categoryIcon=""
              concerns={concerns}
              selectedConcerns={selectedConcerns}
              onToggleConcern={handleToggleConcern}
            />
          ))}
          
          {/* Selection counter */}
          {selectedConcerns.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary-mint">
                  {selectedConcerns.length}개
                </span>의 고민을 선택했어요
              </p>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <WizardFooter 
        onNext={handleNext} 
        disabled={!canProceed}
      />
    </div>
  );
}
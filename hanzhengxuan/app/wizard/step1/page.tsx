'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useCategories } from '@/hooks/api/useCategories';
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { CategoryCard } from '@/components/wizard/CategoryCard';
import { WizardFooter } from '@/components/wizard/WizardFooter';


export default function WizardStep1() {
  const router = useRouter();
  const { 
    sessionId,
    selectedCategory, 
    setCategory 
  } = useAppStore();
  
  const { data: categories, isLoading, error } = useCategories();
  const { mutate: saveInput, isPending: isSaving } = useSaveWizardInput();

  // Redirect to landing if no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    }
  }, [sessionId, router]);

  const handleCategorySelect = (categoryId: string) => {
    // If same category is clicked, deselect it
    if (selectedCategory === categoryId) {
      setCategory(null);
    } else {
      setCategory(categoryId);
    }
  };

  const handleNext = () => {
    if (selectedCategory) {
      // Save the selected category as an array for API compatibility
      saveInput(
        {
          step_number: 1,
          selected_concerns: [selectedCategory]
        },
        {
          onSuccess: () => {
            router.push('/wizard/step2');
          },
          onError: (error) => {
            console.error('Failed to save category:', error);
            // Still navigate even if save fails
            router.push('/wizard/step2');
          }
        }
      );
    }
  };

  const canProceed = !!selectedCategory;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
      </div>
    );
  }
  
  if (error || !categories) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">카테고리를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WizardHeader currentStep={1} totalSteps={3} />
      
      {/* Main content */}
      <main className="px-5 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Question */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            어떤 고민이 있어?
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            가장 고민되는 부분을 선택해주세요
          </p>
          
          {/* Category grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category: any) => (
              <CategoryCard
                key={category.id}
                {...category}
                selected={selectedCategory === category.id}
                disabled={false}
                onSelect={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
          
          {/* Selection indicator */}
          {selectedCategory && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary-mint">
                  {categories.find((c: any) => c.id === selectedCategory)?.name}
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
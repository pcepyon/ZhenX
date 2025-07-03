'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { WizardHeader } from '@/components/wizard/WizardHeader';
import { CategoryCard } from '@/components/wizard/CategoryCard';
import { WizardFooter } from '@/components/wizard/WizardFooter';

const categories = [
  { id: 'elasticity', name: '탄력', icon: '🎈', description: '피부 처짐과 탄력 개선' },
  { id: 'volume', name: '볼륨', icon: '💧', description: '볼륨 손실 개선' },
  { id: 'wrinkles', name: '주름', icon: '〰️', description: '주름 개선' },
  { id: 'skin_texture', name: '피부결·모공', icon: '✨', description: '피부결과 모공 개선' },
  { id: 'pigmentation', name: '색소', icon: '🎨', description: '색소 침착 개선' },
  { id: 'body', name: '바디', icon: '💃', description: '바디 라인 개선' }
];

export default function WizardStep1() {
  const router = useRouter();
  const { 
    sessionId,
    selectedCategories, 
    addCategory, 
    removeCategory 
  } = useAppStore();

  // Redirect to landing if no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    }
  }, [sessionId, router]);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      removeCategory(categoryId);
    } else if (selectedCategories.length < 3) {
      addCategory(categoryId);
    }
  };

  const handleNext = () => {
    if (selectedCategories.length > 0) {
      router.push('/wizard/step2');
    }
  };

  const canProceed = selectedCategories.length > 0;

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
            최대 3개까지 선택할 수 있어요
          </p>
          
          {/* Category grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                selected={selectedCategories.includes(category.id)}
                disabled={
                  selectedCategories.length >= 3 && 
                  !selectedCategories.includes(category.id)
                }
                onSelect={() => toggleCategory(category.id)}
              />
            ))}
          </div>
          
          {/* Selection counter */}
          {selectedCategories.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary-mint">
                  {selectedCategories.length}개
                </span> 선택했어요
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
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useCategories } from '@/hooks/api/useCategories';
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs';
import { CategoryCard } from '@/components/wizard/CategoryCard';
import { WizardFooter } from '@/components/wizard/WizardFooter';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';


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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  if (error || !categories) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <p className="text-red-500">카테고리를 불러오는데 실패했습니다.</p>
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
          initial={{ width: '0%' }}
          animate={{ width: '33.33%' }}
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              Step 1/3
            </span>
            <span className="text-xs text-gray-500">카테고리 선택</span>
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
              어떤 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">고민</span>이 있어?
            </h1>
            <p className="text-lg text-gray-600 mb-8 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              가장 고민되는 부분을 선택해주세요
            </p>
          </motion.div>
          
          {/* Category grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
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
            {categories.map((category: any, index: number) => (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <CategoryCard
                  {...category}
                  selected={selectedCategory === category.id}
                  disabled={false}
                  onSelect={() => handleCategorySelect(category.id)}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Selection indicator */}
          {selectedCategory && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-base text-gray-600 bg-white/80 backdrop-blur-sm inline-block px-4 py-2 rounded-full shadow-sm">
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  {categories.find((c: any) => c.id === selectedCategory)?.name}
                </span>을(를) 선택했어요 ✨
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
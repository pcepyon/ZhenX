'use client';

import { ConcernItem } from './ConcernItem';
import { Concern } from '@/hooks/api/useConcerns';
import { Concern as SelectedConcern } from '@/store/types';
import { motion } from 'framer-motion';

interface ConcernSectionProps {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  concerns: Concern[];
  selectedConcerns: SelectedConcern[];
  onToggleConcern: (concern: Concern) => void;
}

const getCategoryInfo = (categoryId: string) => {
  const categoryMap: Record<string, { name: string; icon: string }> = {
    'elasticity': { name: '탄력', icon: '🎈' },
    'volume': { name: '볼륨', icon: '💧' },
    'wrinkles': { name: '주름', icon: '〰️' },
    'skin_texture': { name: '피부결·모공', icon: '✨' },
    'pigmentation': { name: '색소', icon: '🎨' },
    'body': { name: '바디', icon: '💃' }
  };
  
  return categoryMap[categoryId] || { name: categoryId, icon: '📋' };
};

export function ConcernSection({
  categoryId,
  concerns,
  selectedConcerns,
  onToggleConcern
}: ConcernSectionProps) {
  const { name: categoryName, icon: categoryIcon } = getCategoryInfo(categoryId);
  
  // Filter concerns for this category
  const categoryConcerns = concerns.filter(c => c.category_id === categoryId);
  
  if (categoryConcerns.length === 0) return null;
  
  return (
    <div className="mb-8">
      <motion.div 
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="text-3xl">{categoryIcon}</span>
        <h3 className="text-xl font-medium text-gray-800">{categoryName}</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {categoryConcerns.length}개 항목
        </span>
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {categoryConcerns.map((concern) => {
          const isSelected = selectedConcerns.some(
            sc => sc.id === concern.id
          );
          
          return (
            <motion.div
              key={concern.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <ConcernItem
                id={concern.id}
                name={concern.name}
                description={concern.description}
                checked={isSelected}
                onChange={() => onToggleConcern(concern)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
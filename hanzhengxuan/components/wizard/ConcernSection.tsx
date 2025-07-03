'use client';

import { ConcernItem } from './ConcernItem';
import { Concern } from '@/hooks/api/useConcerns';
import { Concern as SelectedConcern } from '@/store/types';

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
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{categoryIcon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{categoryName}</h3>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {categoryConcerns.map((concern) => {
          const isSelected = selectedConcerns.some(
            sc => sc.id === concern.id
          );
          
          return (
            <div key={concern.id} className="px-4">
              <ConcernItem
                id={concern.id}
                name={concern.name}
                description={concern.description}
                checked={isSelected}
                onChange={() => onToggleConcern(concern)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
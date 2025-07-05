'use client';

import { getTreatmentIcon, categoryColors } from '@/lib/utils/treatmentIcons';

interface Treatment {
  code: string;
  name: string;
  name_cn: string;
  duration: number;
  category: string;
  category_cn: string;
  description: string;
  description_cn: string;
  iconType: string;
  quantity: number;
}

interface TreatmentListProps {
  treatments: Treatment[];
  onTreatmentClick?: (code: string) => void;
}

export function TreatmentList({ treatments, onTreatmentClick }: TreatmentListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-base">📌</span>
        구성 시술 ({treatments.length}개)
      </h3>
      
      <div className="space-y-3">
        {treatments.map((treatment) => {
          const colorClass = categoryColors[treatment.iconType] || categoryColors.default;
          
          return (
            <div
              key={treatment.code}
              onClick={() => onTreatmentClick?.(treatment.code)}
              className={`
                bg-white rounded-xl border border-gray-200 p-4
                ${onTreatmentClick ? 'cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`${colorClass} p-2 rounded-lg flex-shrink-0`}>
                  {getTreatmentIcon(treatment.iconType)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">
                    {treatment.name}
                  </h4>
                  {treatment.name_cn && (
                    <p className="text-xs text-gray-500 mt-0.5">{treatment.name_cn}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
                
                {/* Duration & Category */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-gray-900">
                    ⏱ {treatment.duration}분
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {treatment.category}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
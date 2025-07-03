'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { TreatmentSummary } from './TreatmentSummary';
import { TreatmentProcess } from './TreatmentProcess';
import { TreatmentFAQ } from './TreatmentFAQ';
import { useTreatmentDetail } from '@/hooks/useTreatmentDetail';

interface TreatmentBottomSheetProps {
  treatmentCode: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TreatmentBottomSheet({
  treatmentCode,
  isOpen,
  onClose
}: TreatmentBottomSheetProps) {
  const { treatmentData, isLoading } = useTreatmentDetail(treatmentCode);
  
  if (!treatmentCode) return null;
  
  return (
    <BottomSheet
      open={isOpen}
      onClose={onClose}
      height="auto"
      style={{ zIndex: 200 }} // Higher than modal (100)
    >
      {isLoading ? (
        <div className="p-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">시술 정보를 불러오는 중...</p>
        </div>
      ) : treatmentData ? (
        <>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {treatmentData.name_ko}
                </h3>
                {treatmentData.name_cn && (
                  <p className="text-sm text-gray-600">{treatmentData.name_cn}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M6 18L18 6M6 6l12 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Summary metrics */}
            <TreatmentSummary
              duration={treatmentData.duration_minutes}
              recoveryDays={treatmentData.recovery_days}
              basePrice={treatmentData.base_price}
            />
            
            {/* Description */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">시술 소개</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {treatmentData.description}
              </p>
            </div>
            
            {/* Benefits */}
            {treatmentData.benefits.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">주요 효과</h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {treatmentData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Process steps */}
            <TreatmentProcess steps={treatmentData.process_steps} />
            
            {/* Precautions */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">주의사항</h4>
              
              {/* Before treatment */}
              {treatmentData.precautions.before.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">시술 전</h5>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <ul className="space-y-1">
                      {treatmentData.precautions.before.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 text-xs mt-0.5">•</span>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* After treatment */}
              {treatmentData.precautions.after.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">시술 후</h5>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <ul className="space-y-1">
                      {treatmentData.precautions.after.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 text-xs mt-0.5">•</span>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* FAQs */}
            <TreatmentFAQ faqs={treatmentData.faqs} />
          </div>
          
          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onClose}
              className="w-full"
            >
              이해했어! 닫기
            </Button>
          </div>
        </>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-600">시술 정보를 불러올 수 없습니다.</p>
        </div>
      )}
    </BottomSheet>
  );
}
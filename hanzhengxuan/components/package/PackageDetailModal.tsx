'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PriceBreakdown } from './PriceBreakdown';
import { TreatmentTimeline } from './TreatmentTimeline';
import { DoctorInfo } from './DoctorInfo';
import { TreatmentBottomSheet } from '@/components/treatment/TreatmentBottomSheet';
import { usePackageDetail } from '@/hooks/usePackageDetail';
import { useAppStore } from '@/store/useAppStore';

interface PackageDetailModalProps {
  packageCode: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PackageDetailModal({
  packageCode,
  isOpen,
  onClose
}: PackageDetailModalProps) {
  const router = useRouter();
  const { addInterest, removeInterest, isInterested } = useAppStore();
  const { packageData, priceBreakdown, treatmentTimeline, isLoading } = usePackageDetail(packageCode);
  const [isLiked, setIsLiked] = useState(packageCode ? isInterested(packageCode) : false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [isTreatmentSheetOpen, setIsTreatmentSheetOpen] = useState(false);
  
  if (!packageCode) return null;
  
  const handleInterestToggle = () => {
    if (isLiked) {
      removeInterest(packageCode);
    } else {
      addInterest(packageCode);
    }
    setIsLiked(!isLiked);
  };
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
    }
    return `${mins}분`;
  };
  
  const handleTreatmentClick = (treatmentCode: string) => {
    setSelectedTreatment(treatmentCode);
    setIsTreatmentSheetOpen(true);
  };
  
  const handleTreatmentSheetClose = () => {
    setIsTreatmentSheetOpen(false);
    setSelectedTreatment(null);
  };
  
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-2xl"
    >
      {isLoading ? (
        <div className="p-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">패키지 정보를 불러오는 중...</p>
        </div>
      ) : packageData ? (
        <>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {packageData.name_ko}
                </h2>
                {packageData.name_cn && (
                  <p className="text-sm text-gray-600 mt-1">{packageData.name_cn}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                  <span>⏱️ {formatDuration(packageData.duration_minutes)}</span>
                  <span>•</span>
                  <span>💰 ₩{packageData.final_price.toLocaleString('ko-KR')}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="닫기"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M18 6L6 18M6 6l12 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Description */}
            {packageData.description_ko && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">패키지 소개</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {packageData.description_ko}
                </p>
              </div>
            )}
            
            {/* Treatment Timeline */}
            <TreatmentTimeline
              treatments={treatmentTimeline}
              onTreatmentClick={handleTreatmentClick}
            />
            
            {/* Price Breakdown */}
            {priceBreakdown && (
              <PriceBreakdown {...priceBreakdown} />
            )}
            
            {/* Benefits */}
            {packageData.highlight_benefits?.ko && packageData.highlight_benefits.ko.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">주요 효과</h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {packageData.highlight_benefits.ko.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Doctor Info */}
            <DoctorInfo />
          </div>
          
          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 pt-4">
            <div className="flex gap-3">
              <button
                onClick={handleInterestToggle}
                className={`px-4 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
                  isLiked 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill={isLiked ? 'currentColor' : 'none'}
                >
                  <path 
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">
                  {isLiked ? '관심 추가됨' : '관심 추가'}
                </span>
              </button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => {
                  // Add package to interests if not already added
                  if (!isLiked) {
                    addInterest(packageCode);
                  }
                  // Navigate to interests page
                  router.push('/interests');
                  onClose();
                }}
              >
                이 패키지로 견적받기
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-600">패키지 정보를 불러올 수 없습니다.</p>
        </div>
      )}
      
      {/* Treatment Bottom Sheet */}
      <TreatmentBottomSheet
        treatmentCode={selectedTreatment}
        isOpen={isTreatmentSheetOpen}
        onClose={handleTreatmentSheetClose}
      />
    </Modal>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PriceBreakdown } from './PriceBreakdown';
import { TreatmentList } from './TreatmentList';
import { PackageStorySection } from './PackageStorySection';
import { PriceTimeBar } from './PriceTimeBar';
import { DoctorInfo } from './DoctorInfo';
import { TreatmentBottomSheet } from '@/components/treatment/TreatmentBottomSheet';
import { usePackageDetail } from '@/hooks/usePackageDetail';
import { useAppStore } from '@/store/useAppStore';
import { packageStories } from '@/lib/data/packageStories';

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
  
  // Get package story data
  const packageStory = packageCode ? packageStories[packageCode] : null;
  
  // Calculate total duration
  const totalDuration = treatmentTimeline.reduce((sum, t) => sum + t.duration, 0);
  
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
          {/* Modal Content - No header needed, Modal component has close button */}
          <div className="p-6 space-y-6">
            {/* Package Story Section */}
            <PackageStorySection
              packageCode={packageCode}
              name={packageData.name_ko}
              tagline={packageStory?.tagline}
              story={packageStory?.story}
              keyBenefits={packageStory?.keyBenefits}
              changeLevel={packageStory?.changeLevel}
              changeLevelText={packageStory?.changeLevelText}
            />
            
            {/* Price and Time Bar */}
            {priceBreakdown && (
              <PriceTimeBar
                packagePrice={priceBreakdown.total}
                originalPrice={priceBreakdown.subtotal}
                totalDuration={totalDuration}
              />
            )}
            
            {/* Treatment List */}
            <TreatmentList
              treatments={treatmentTimeline}
              onTreatmentClick={handleTreatmentClick}
            />
            
            {/* Doctor Info - Keep as is for now */}
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
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { usePackages } from '@/hooks/api/usePackages';
import { InterestCard } from '@/components/interest/InterestCard';
import { PriceSummary } from '@/components/interest/PriceSummary';
import { EmptyState } from '@/components/interest/EmptyState';
import { PackageDetailModal } from '@/components/package/PackageDetailModal';
import { Button } from '@/components/ui/Button';

export default function InterestsPage() {
  const router = useRouter();
  const { 
    interestedPackages, 
    removeInterest, 
    clearAllInterests,
    sessionId 
  } = useAppStore();
  
  const { data: allPackages, isLoading } = usePackages();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());
  const [selectedPackageCode, setSelectedPackageCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter packages to only show interested ones
  const interestedPackageDetails = useMemo(() => {
    if (!allPackages) return [];
    return allPackages.filter(pkg => interestedPackages.includes(pkg.package_code));
  }, [allPackages, interestedPackages]);
  
  // Calculate price summary for selected packages
  const priceSummary = useMemo(() => {
    const selected = interestedPackageDetails.filter(pkg => 
      selectedPackages.has(pkg.package_code)
    );
    
    const totalOriginal = selected.reduce((sum, pkg) => 
      sum + (pkg.original_price || pkg.final_price), 0
    );
    const totalFinal = selected.reduce((sum, pkg) => 
      sum + pkg.final_price, 0
    );
    
    return {
      selectedCount: selected.length,
      totalOriginalPrice: totalOriginal,
      totalFinalPrice: totalFinal
    };
  }, [interestedPackageDetails, selectedPackages]);
  
  const handleToggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedPackages(new Set());
    }
  };
  
  const handleToggleSelect = (packageCode: string) => {
    setSelectedPackages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(packageCode)) {
        newSet.delete(packageCode);
      } else {
        newSet.add(packageCode);
      }
      return newSet;
    });
  };
  
  const handleSelectAll = () => {
    if (selectedPackages.size === interestedPackageDetails.length) {
      setSelectedPackages(new Set());
    } else {
      setSelectedPackages(new Set(interestedPackageDetails.map(pkg => pkg.package_code)));
    }
  };
  
  const handleDeleteSelected = () => {
    selectedPackages.forEach(packageCode => {
      removeInterest(packageCode);
    });
    setSelectedPackages(new Set());
    setIsSelectMode(false);
  };
  
  const handleViewDetail = (packageCode: string) => {
    setSelectedPackageCode(packageCode);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackageCode(null);
  };
  
  const handleExplore = () => {
    if (sessionId) {
      router.push('/recommendations');
    } else {
      router.push('/');
    }
  };
  
  const handleGenerateQuote = () => {
    if (selectedPackages.size > 0) {
      const packageCodes = Array.from(selectedPackages).join(',');
      router.push(`/quote/create?packages=${packageCodes}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="px-5 py-6">
        {/* Interest summary */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                관심 패키지 {interestedPackages.length}개
              </h1>
              {isSelectMode && (
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPackages.size}개 선택됨
                </p>
              )}
            </div>
            {interestedPackages.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleSelectMode}
                >
                  {isSelectMode ? '완료' : '선택'}
                </Button>
                {!isSelectMode && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllInterests}
                    className="text-red-600 hover:text-red-700"
                  >
                    전체 삭제
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          {interestedPackageDetails.length === 0 ? (
            <EmptyState onExplore={handleExplore} />
          ) : (
            <>
              {/* Select all button (in select mode) */}
              {isSelectMode && (
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={handleSelectAll}
                    className="text-sm font-medium text-primary-mint hover:text-primary-mint-dark"
                  >
                    {selectedPackages.size === interestedPackageDetails.length 
                      ? '전체 해제' 
                      : '전체 선택'}
                  </button>
                  {selectedPackages.size > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      선택 삭제 ({selectedPackages.size})
                    </button>
                  )}
                </div>
              )}
              
              {/* Package cards */}
              <div className="space-y-4 mb-6">
                {interestedPackageDetails.map((pkg) => (
                  <InterestCard
                    key={pkg.package_code}
                    packageCode={pkg.package_code}
                    name={pkg.name_ko}
                    priceTier={pkg.price_tier as any}
                    originalPrice={pkg.original_price || pkg.final_price}
                    finalPrice={pkg.final_price}
                    treatments={pkg.treatments || []}
                    onRemove={() => removeInterest(pkg.package_code)}
                    onViewDetail={() => handleViewDetail(pkg.package_code)}
                    selected={selectedPackages.has(pkg.package_code)}
                    onSelect={isSelectMode ? () => handleToggleSelect(pkg.package_code) : undefined}
                  />
                ))}
              </div>
              
              {/* Price summary (in select mode) */}
              {isSelectMode && selectedPackages.size > 0 && (
                <PriceSummary
                  {...priceSummary}
                  className="mb-6"
                />
              )}
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                {isSelectMode && selectedPackages.size > 0 ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleGenerateQuote}
                    className="w-full"
                  >
                    선택한 패키지로 견적받기 ({selectedPackages.size}개)
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleExplore}
                      className="w-full"
                    >
                      더 둘러보기
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => {
                        setIsSelectMode(true);
                        setSelectedPackages(new Set(interestedPackageDetails.map(pkg => pkg.package_code)));
                      }}
                      className="w-full"
                    >
                      전체 패키지로 견적받기
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      {/* Package Detail Modal */}
      <PackageDetailModal
        packageCode={selectedPackageCode}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
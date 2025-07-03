'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useRecommendations } from '@/hooks/api/useRecommendations';
import { PackageCard } from '@/components/package/PackageCard';
import { PriceTierFilter } from '@/components/package/PriceTierFilter';
import { InterestFAB } from '@/components/package/InterestFAB';
import { PackageDetailModal } from '@/components/package/PackageDetailModal';
import { Button } from '@/components/ui/Button';

export default function RecommendationsPage() {
  const router = useRouter();
  const { sessionId, recommendations: storeRecommendations } = useAppStore();
  const { data: apiRecommendations, isLoading, error } = useRecommendations();
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedPackageCode, setSelectedPackageCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use store recommendations or API data
  const recommendations = useMemo(() => {
    if (apiRecommendations && apiRecommendations.length > 0) {
      return apiRecommendations;
    }
    // Convert store recommendations to API format
    return storeRecommendations.map((rec, index) => ({
      package_code: rec.packageCode,
      package_name: rec.name,
      price_tier: rec.priceTier,
      match_score: rec.matchScore || 85,
      rank_order: index + 1,
      final_price: rec.finalPrice,
      original_price: rec.originalPrice || rec.finalPrice,
      reasoning: '',
      highlight_points: [],
      covered_concerns: 0
    }));
  }, [apiRecommendations, storeRecommendations]);
  
  // Get available tiers from recommendations
  const availableTiers = useMemo(() => {
    const tiers = new Set(recommendations.map(r => r.price_tier));
    return Array.from(tiers);
  }, [recommendations]);
  
  // Filter recommendations by selected tier
  const filteredRecommendations = useMemo(() => {
    if (selectedTier === 'all') return recommendations;
    return recommendations.filter(r => r.price_tier === selectedTier);
  }, [recommendations, selectedTier]);
  
  // Redirect if no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    }
  }, [sessionId, router]);
  
  const handlePackageDetail = (packageCode: string) => {
    setSelectedPackageCode(packageCode);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackageCode(null);
  };
  
  const handleRestart = () => {
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">추천 결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  if (error || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">추천 결과를 찾을 수 없어요</h2>
          <p className="text-gray-600 mb-6">다시 시도해주세요</p>
          <Button variant="primary" onClick={handleRestart}>
            처음부터 다시 시작
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">
            너를 위한 패키지 {filteredRecommendations.length}개를 찾았어!
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            AI가 분석한 맞춤 추천이야
          </p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="px-5 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Price tier filter */}
          <div className="mb-6">
            <PriceTierFilter
              selectedTier={selectedTier}
              onTierChange={setSelectedTier}
              availableTiers={availableTiers}
            />
          </div>
          
          {/* Package cards */}
          <div className="space-y-4">
            {filteredRecommendations.map((recommendation) => (
              <PackageCard
                key={recommendation.package_code}
                packageCode={recommendation.package_code}
                name={recommendation.package_name}
                priceTier={recommendation.price_tier as any}
                matchScore={recommendation.match_score}
                originalPrice={recommendation.original_price || recommendation.final_price}
                finalPrice={recommendation.final_price}
                highlights={recommendation.highlight_points}
                onDetailClick={() => handlePackageDetail(recommendation.package_code)}
              />
            ))}
          </div>
          
          {/* Empty state for filtered results */}
          {filteredRecommendations.length === 0 && selectedTier !== 'all' && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                선택한 가격대에 맞는 패키지가 없어요
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedTier('all')}
              >
                전체 보기
              </Button>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="secondary"
              onClick={handleRestart}
              className="w-full"
            >
              다시 추천받기
            </Button>
          </div>
        </div>
      </main>
      
      {/* Floating action button */}
      <InterestFAB />
      
      {/* Package Detail Modal */}
      <PackageDetailModal
        packageCode={selectedPackageCode}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
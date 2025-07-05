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
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';

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
      package_id: '',  // Store doesn't have package_id
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">추천 결과를 불러오는 중...</p>
        </motion.div>
      </div>
    );
  }
  
  if (error || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div 
            className="mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
          <h2 className="text-2xl font-light text-gray-800 mb-3">추천 결과를 찾을 수 없어요</h2>
          <p className="text-gray-600 mb-8">다시 시도해주세요</p>
          <Button 
            variant="primary" 
            onClick={handleRestart}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              처음부터 다시 시작
            </span>
          </Button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-32">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full opacity-20"
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative px-5 py-8">
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI 분석 완료
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">
            너를 위한 패키지 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 font-medium">
              {filteredRecommendations.length}개
            </span>
            를 찾았어!
          </h1>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.span>
            AI가 분석한 맞춤 추천이야
          </p>
        </motion.div>
        <div className="relative max-w-2xl mx-auto">
          {/* Price tier filter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PriceTierFilter
              selectedTier={selectedTier}
              onTierChange={setSelectedTier}
              availableTiers={availableTiers}
            />
          </motion.div>
          
          {/* Package cards */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.package_code}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <PackageCard
                    packageCode={recommendation.package_code}
                    name={recommendation.package_name}
                    priceTier={recommendation.price_tier as any}
                    matchScore={recommendation.match_score}
                    originalPrice={recommendation.original_price || recommendation.final_price}
                    finalPrice={recommendation.final_price}
                    highlights={recommendation.highlight_points}
                    onDetailClick={() => handlePackageDetail(recommendation.package_code)}
                    rank={index + 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Empty state for filtered results */}
          <AnimatePresence>
            {filteredRecommendations.length === 0 && selectedTier !== 'all' && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🤔</span>
                </div>
                <p className="text-gray-600 mb-6">
                  선택한 가격대에 맞는 패키지가 없어요
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedTier('all')}
                  className="hover:shadow-md transition-all"
                >
                  전체 보기
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Action buttons */}
          <motion.div 
            className="mt-12 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="secondary"
              onClick={handleRestart}
              className="w-full bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all group"
            >
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                다시 추천받기
              </span>
            </Button>
          </motion.div>
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
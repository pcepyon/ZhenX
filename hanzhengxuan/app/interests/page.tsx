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
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, CheckCircle, ShoppingBag, Sparkles } from 'lucide-react';

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
      sum + pkg.final_price, 0
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">불러오는 중...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-rose-100 to-pink-100 rounded-full opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative px-5 py-8">
        {/* Interest summary */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full"
                >
                  <Heart className="w-5 h-5 text-rose-500" />
                </motion.div>
                <h1 className="text-2xl font-light text-gray-800">
                  관심 패키지 <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">{interestedPackages.length}개</span>
                </h1>
              </div>
              <AnimatePresence>
                {isSelectMode && (
                  <motion.p 
                    className="text-sm text-gray-600 flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {selectedPackages.size}개 선택됨
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {interestedPackages.length > 0 && (
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleToggleSelectMode}
                    className={isSelectMode ? "border-emerald-300 text-emerald-700 bg-emerald-50" : ""}
                  >
                    <span className="flex items-center gap-2">
                      {isSelectMode ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          완료
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          선택
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
                <AnimatePresence>
                  {!isSelectMode && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={clearAllInterests}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        <span className="flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          전체 삭제
                        </span>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
        <div className="relative max-w-2xl mx-auto">
          {interestedPackageDetails.length === 0 ? (
            <EmptyState onExplore={handleExplore} />
          ) : (
            <>
              {/* Select all button (in select mode) */}
              <AnimatePresence>
                {isSelectMode && (
                  <motion.div 
                    className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <motion.button
                      onClick={handleSelectAll}
                      className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {selectedPackages.size === interestedPackageDetails.length 
                        ? '전체 해제' 
                        : '전체 선택'}
                    </motion.button>
                    {selectedPackages.size > 0 && (
                      <motion.button
                        onClick={handleDeleteSelected}
                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        선택 삭제 ({selectedPackages.size})
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Package cards */}
              <motion.div 
                className="space-y-4 mb-8"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <AnimatePresence>
                  {interestedPackageDetails.map((pkg, index) => (
                    <motion.div
                      key={pkg.package_code}
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                      whileHover={{ x: 4 }}
                    >
                      <InterestCard
                        packageCode={pkg.package_code}
                        name={pkg.name}
                        priceTier={pkg.price_tier as any}
                        originalPrice={pkg.final_price}
                        finalPrice={pkg.final_price}
                        treatments={[]}
                        onRemove={() => removeInterest(pkg.package_code)}
                        onViewDetail={() => handleViewDetail(pkg.package_code)}
                        selected={selectedPackages.has(pkg.package_code)}
                        onSelect={isSelectMode ? () => handleToggleSelect(pkg.package_code) : undefined}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              
              {/* Price summary (in select mode) */}
              <AnimatePresence>
                {isSelectMode && selectedPackages.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mb-8"
                  >
                    <PriceSummary
                      {...priceSummary}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Action buttons */}
              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {isSelectMode && selectedPackages.size > 0 ? (
                    <motion.div
                      key="quote-button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleGenerateQuote}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          선택한 패키지로 견적받기 ({selectedPackages.size}개)
                        </span>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="explore-buttons"
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleExplore}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          더 둘러보기
                        </span>
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                          setIsSelectMode(true);
                          setSelectedPackages(new Set(interestedPackageDetails.map(pkg => pkg.package_code)));
                        }}
                        className="w-full bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingBag className="w-5 h-5" />
                          전체 패키지로 견적받기
                        </span>
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
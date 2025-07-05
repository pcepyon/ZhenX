'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { usePackages } from '@/hooks/api/usePackages';
import { useCreateQuote } from '@/hooks/useCreateQuote';
import { PackageSummary } from '@/components/quote/PackageSummary';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { QuoteOptions } from '@/components/quote/QuoteOptions';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';

interface PersonalInfo {
  name?: string;
  visit_date?: string;
  memo?: string;
}

export default function QuoteCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sessionId } = useAppStore();
  const { data: allPackages, isLoading: isLoadingPackages } = usePackages();
  const createQuote = useCreateQuote();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [quoteOptions, setQuoteOptions] = useState<Record<string, boolean>>({
    include_transportation: true,
    include_preparation: true,
    share_link: false
  });
  
  // Get selected package codes from URL
  const selectedPackageCodes = useMemo(() => {
    const packagesParam = searchParams.get('packages');
    return packagesParam ? packagesParam.split(',') : [];
  }, [searchParams]);
  
  // Filter packages based on selected codes
  const selectedPackages = useMemo(() => {
    if (!allPackages) return [];
    return allPackages.filter(pkg => 
      selectedPackageCodes.includes(pkg.package_code)
    );
  }, [allPackages, selectedPackageCodes]);
  
  // Redirect if no packages selected or no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    } else if (!isLoadingPackages && selectedPackages.length === 0) {
      router.push('/interests');
    }
  }, [sessionId, selectedPackages.length, isLoadingPackages, router]);
  
  const handleSubmit = async () => {
    if (selectedPackages.length === 0) return;
    
    // Filter out empty personal info fields
    const filteredPersonalInfo = Object.entries(personalInfo).reduce((acc, [key, value]) => {
      if (value && value.trim() !== '') {
        acc[key as keyof PersonalInfo] = value;
      }
      return acc;
    }, {} as PersonalInfo);
    
    // Create quote request
    const quoteData = {
      selected_packages: selectedPackageCodes,
      personal_info: Object.keys(filteredPersonalInfo).length > 0 ? filteredPersonalInfo : undefined
    };
    
    createQuote.mutate(quoteData);
  };
  
  if (isLoadingPackages || selectedPackages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
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
          className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full opacity-20"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative px-5 py-8">
        {/* Page title */}
        <motion.div 
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header with icon */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl"
            >
              <FileText className="w-6 h-6 text-indigo-600" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-light text-gray-800">
                견적서 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-medium">만들기</span>
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                선택한 패키지로 견적서를 생성해요
              </p>
            </div>
          </div>
        </motion.div>
        <div className="relative max-w-2xl mx-auto space-y-6">
          {/* Package summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PackageSummary packages={selectedPackages} />
          </motion.div>
          
          {/* Personal info form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QuoteForm onInfoChange={setPersonalInfo} />
          </motion.div>
          
          {/* Quote options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuoteOptions onOptionsChange={setQuoteOptions} />
          </motion.div>
          
          {/* Submit button */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={createQuote.isPending}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all group"
            >
              {createQuote.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  견적서 생성 중...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  견적서 생성하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            
            {createQuote.isError && (
              <motion.p 
                className="text-sm text-red-600 text-center mt-3 bg-red-50 py-2 px-4 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                견적서 생성에 실패했습니다. 다시 시도해주세요.
              </motion.p>
            )}
          </motion.div>
          
          {/* Info text */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-700">
                견적서는 발급 후 <span className="font-medium text-indigo-600">7일간</span> 유효하며
                <span className="mx-1">·</span>
                고유 번호로 언제든지 조회 가능
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
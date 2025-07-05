'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SuccessAnimation } from '@/components/quote/SuccessAnimation';
import { QuoteInfoCard } from '@/components/quote/QuoteInfoCard';
import { ShareActions } from '@/components/quote/ShareActions';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/api/client';
import {
  shareToClipboard,
  shareToWeChat,
  shareToKakao,
  generateQRCode,
  generateShareMessage
} from '@/lib/share';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, MessageCircle, Home, CheckCircle2, Sparkles } from 'lucide-react';

interface QuoteData {
  quote_id: string;
  total_price: number;
  package_count: number;
  created_at: string;
  expires_at: string;
  personal_info?: {
    name?: string;
    visit_date?: string;
  };
  packages: Array<{
    package_code: string;
    name_ko: string;
    final_price: number;
  }>;
}

export default function QuoteSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('id');
  const [showAnimation, setShowAnimation] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Fetch quote details
  const { data: quote, isLoading } = useQuery<QuoteData>({
    queryKey: ['quote', quoteId],
    queryFn: async () => {
      if (!quoteId) throw new Error('No quote ID provided');
      
      // Mock data for development
      return {
        quote_id: quoteId,
        total_price: 3500000,
        package_count: 2,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        personal_info: {
          name: '김민지',
          visit_date: '2025-02-15'
        },
        packages: [
          {
            package_code: 'ELASTICITY_PREMIUM',
            name_ko: '프리미엄 탄력 패키지',
            final_price: 2000000
          },
          {
            package_code: 'WHITENING_BASIC',
            name_ko: '베이직 미백 패키지',
            final_price: 1500000
          }
        ]
      };
      
      // In production:
      // return apiClient.get(`/quotes/${quoteId}`);
    },
    enabled: !!quoteId,
    retry: false
  });
  
  // Redirect if no quote ID
  useEffect(() => {
    if (!quoteId) {
      router.push('/');
    }
  }, [quoteId, router]);
  
  const showMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  const handleShare = async (method: 'copy' | 'wechat' | 'kakao' | 'qr') => {
    if (!quote) return;
    
    const shareOptions = generateShareMessage(quote.quote_id, quote.package_count);
    
    switch (method) {
      case 'copy':
        const success = await shareToClipboard(shareOptions.url);
        if (success) {
          showMessage('링크가 복사되었습니다!');
        }
        break;
        
      case 'wechat':
        shareToWeChat(shareOptions.url);
        break;
        
      case 'kakao':
        shareToKakao(shareOptions);
        break;
        
      case 'qr':
        const qrUrl = generateQRCode(shareOptions.url);
        window.open(qrUrl, '_blank');
        break;
    }
  };
  
  const handleViewQuote = () => {
    if (quote) {
      router.push(`/quote/${quote.quote_id}`);
    }
  };
  
  const handleConsultation = () => {
    router.push('/consultation');
  };
  
  const handleBackToHome = () => {
    router.push('/');
  };
  
  if (isLoading || !quote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">견적서 정보를 불러오는 중...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-full opacity-20"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
          >
            <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-sm font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <main className="relative px-5 py-8">
        <div className="max-w-lg mx-auto">
          {/* Success animation */}
          <AnimatePresence>
            {showAnimation && (
              <motion.div 
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <SuccessAnimation
                  onAnimationComplete={() => {
                    setTimeout(() => setShowAnimation(false), 1000);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Success message */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: showAnimation ? 1 : 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, delay: showAnimation ? 1.2 : 0.4 }}
              className="inline-block mb-4"
            >
              <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3">
              견적서가 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 font-medium">생성</span>되었어요!
            </h1>
            <motion.p 
              className="text-lg text-gray-600 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: showAnimation ? 1.4 : 0.6 }}
            >
              <Sparkles className="w-5 h-5 text-emerald-500" />
              아래 정보를 확인하고 저장해주세요
            </motion.p>
          </motion.div>
          
          {/* Quote info card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: showAnimation ? 1.6 : 0.8 }}
            className="mb-8"
          >
            <QuoteInfoCard quote={quote} />
          </motion.div>
          
          {/* Action buttons */}
          <motion.div 
            className="space-y-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showAnimation ? 1.8 : 1 }}
          >
            {/* Primary action - View quote */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleViewQuote}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform transition-all group"
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  견적서 자세히 보기
                </span>
              </Button>
            </motion.div>
            
            {/* Share actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showAnimation ? 2 : 1.2 }}
            >
              <ShareActions
                quoteId={quote.quote_id}
                onShare={handleShare}
              />
            </motion.div>
            
            {/* Consultation button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleConsultation}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-lg">중국어 상담 받기</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Back to home link */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showAnimation ? 2.2 : 1.4 }}
          >
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">처음으로 돌아가기</span>
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
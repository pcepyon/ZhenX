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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-mint"></div>
          <p className="mt-2 text-sm text-gray-600">견적서 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-mint-light via-gray-50 to-gray-50">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm">{toastMessage}</p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="px-5 py-8">
        <div className="max-w-md mx-auto">
          {/* Success animation */}
          {showAnimation && (
            <div className="mb-8">
              <SuccessAnimation
                onAnimationComplete={() => {
                  setTimeout(() => setShowAnimation(false), 1000);
                }}
              />
            </div>
          )}
          
          {/* Success message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              견적서가 생성되었어요! 🎉
            </h1>
            <p className="text-gray-600">
              아래 정보를 확인하고 저장해주세요
            </p>
          </div>
          
          {/* Quote info card */}
          <QuoteInfoCard quote={quote} className="mb-8" />
          
          {/* Action buttons */}
          <div className="space-y-4 mb-8">
            {/* Primary action - View quote */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleViewQuote}
              className="w-full"
            >
              견적서 자세히 보기
            </Button>
            
            {/* Share actions */}
            <ShareActions
              quoteId={quote.quote_id}
              onShare={handleShare}
            />
            
            {/* Consultation button */}
            <button
              onClick={handleConsultation}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-medium">중국어 상담 받기</span>
            </button>
          </div>
          
          {/* Back to home link */}
          <div className="text-center">
            <button
              onClick={handleBackToHome}
              className="text-sm text-gray-600 hover:text-primary-mint transition-colors"
            >
              처음으로 돌아가기
            </button>
          </div>
        </div>
      </main>
      
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -1rem);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
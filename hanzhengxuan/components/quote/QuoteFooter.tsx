'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface QuoteFooterProps {
  quoteId: string;
  className?: string;
}

export function QuoteFooter({ quoteId, className }: QuoteFooterProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/quote/${quoteId}`;
      setCurrentUrl(url);
      // Using a QR code generation service
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`);
    }
  }, [quoteId]);
  
  const handleCopyLink = async () => {
    if (currentUrl) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };
  
  const handleShare = () => {
    if (navigator.share && currentUrl) {
      navigator.share({
        title: `韩真选 의료미용 견적서 - ${quoteId}`,
        text: '맞춤형 의료미용 패키지 견적서입니다.',
        url: currentUrl,
      }).catch(console.error);
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <footer className={cn("bg-white border-t border-gray-200 print:mt-8", className)}>
      <div className="max-w-4xl mx-auto px-5 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">韩真选 HanJinSeon</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>한국 의료미용 토탈 솔루션</p>
              <p>고객센터: 1588-0000</p>
              <p>카카오톡: @hanzhengxuan</p>
              <p>위챗: hanzhengxuan_kr</p>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-gray-900 mb-3">견적서 QR 코드</h3>
            {qrCodeUrl && (
              <div className="bg-white p-2 border border-gray-300 rounded">
                <img 
                  src={qrCodeUrl} 
                  alt="Quote QR Code"
                  className="w-32 h-32"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 text-center">
              QR코드로 견적서를<br />쉽게 공유하세요
            </p>
          </div>
          
          {/* Actions */}
          <div className="print:hidden">
            <h3 className="font-semibold text-gray-900 mb-3">견적서 관리</h3>
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-lg border transition-all",
                  copied 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-gray-300 hover:border-primary-mint hover:bg-primary-mint-light"
                )}
              >
                {copied ? '✓ 링크 복사됨' : '링크 복사하기'}
              </button>
              
              {navigator.share && (
                <button
                  onClick={handleShare}
                  className="w-full px-3 py-2 text-sm bg-primary-mint text-white rounded-lg hover:bg-primary-mint-dark transition-colors"
                >
                  공유하기
                </button>
              )}
              
              <button
                onClick={handlePrint}
                className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                인쇄하기
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom notice */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            본 견적서는 참고용이며, 실제 비용은 상담 후 확정됩니다. 
            견적서 유효기간이 지난 경우 재발급이 필요합니다.
          </p>
        </div>
      </div>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { QrCode, Copy, Share2, Printer, MessageCircle, MapPin } from 'lucide-react';

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
    <motion.footer 
      className={cn("bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 print:mt-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-medium text-gray-800">韩真选 HanJinSeon</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600 pl-10">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                한국 의료미용 토탈 솔루션
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                고객센터: 1588-0000
              </p>
              <motion.p 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors"
                whileHover={{ x: 4 }}
              >
                <MessageCircle className="w-4 h-4" />
                카카오톡: @hanzhengxuan
              </motion.p>
              <motion.p 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors"
                whileHover={{ x: 4 }}
              >
                <MessageCircle className="w-4 h-4" />
                위챗: hanzhengxuan_kr
              </motion.p>
            </div>
          </motion.div>
          
          {/* QR Code */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-gray-700" />
              <h3 className="font-medium text-gray-800">견적서 QR 코드</h3>
            </div>
            {qrCodeUrl && (
              <motion.div 
                className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <img 
                  src={qrCodeUrl} 
                  alt="Quote QR Code"
                  className="w-32 h-32 rounded-lg"
                />
              </motion.div>
            )}
            <motion.p 
              className="text-xs text-gray-600 mt-3 text-center bg-gray-100 px-4 py-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              QR코드로 견적서를<br />쉽게 공유하세요
            </motion.p>
          </motion.div>
          
          {/* Actions */}
          <motion.div 
            className="print:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-gray-600" />
              견적서 관리
            </h3>
            <div className="space-y-3">
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full px-4 py-3 text-sm rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium",
                  copied 
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 bg-white"
                )}
              >
                <Copy className="w-4 h-4" />
                {copied ? '✓ 링크 복사됨' : '링크 복사하기'}
              </motion.button>
              
              {navigator.share && (
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  공유하기
                </motion.button>
              )}
              
              <motion.button
                onClick={handlePrint}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Printer className="w-4 h-4" />
                인쇄하기
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom notice */}
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              본 견적서는 참고용이며, 실제 비용은 상담 후 확정됩니다.<br/>
              견적서 유효기간이 지난 경우 재발급이 필요합니다.
            </p>
          </div>
        </motion.div>
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
    </motion.footer>
  );
}
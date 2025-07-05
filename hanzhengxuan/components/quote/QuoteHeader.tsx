'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock } from 'lucide-react';

interface QuoteHeaderProps {
  quoteId: string;
  createdAt: string;
  expiresAt: string;
  className?: string;
}

export function QuoteHeader({ 
  quoteId, 
  createdAt, 
  expiresAt, 
  className 
}: QuoteHeaderProps) {
  const createdDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const expiresDate = new Date(expiresAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const daysUntilExpiry = Math.ceil(
    (new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isExpired = daysUntilExpiry < 0;
  
  return (
    <motion.header 
      className={cn("bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-4xl mx-auto px-5 py-6">
        <div className="flex items-start justify-between">
          {/* Logo and company info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="text-white font-bold text-xl">韩</span>
              </motion.div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">韩真选</h1>
                <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">HanJinSeon Medical Beauty</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              한국 의료미용 토탈 솔루션
            </p>
          </motion.div>
          
          {/* Quote info */}
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 justify-end mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-500">견적번호</p>
              </div>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">{quoteId}</p>
            </motion.div>
            <div className="space-y-2">
              <motion.div 
                className="flex items-center gap-2 justify-end text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <p className="text-gray-600">{createdDate} 발행</p>
              </motion.div>
              {isExpired ? (
                <motion.p 
                  className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-lg inline-block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  견적서 만료됨
                </motion.p>
              ) : (
                <motion.div 
                  className="flex items-center gap-2 justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  <p className={cn(
                    "font-medium text-sm",
                    daysUntilExpiry <= 2 ? "text-orange-600 bg-orange-50 px-2 py-0.5 rounded" : "text-gray-600"
                  )}>
                    {expiresDate}까지 유효
                    {daysUntilExpiry <= 2 && ` (${daysUntilExpiry}일 남음)`}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Print only - watermark for expired quotes */}
        {isExpired && (
          <div className="hidden print:block absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-red-500 text-6xl font-bold opacity-20 rotate-[-30deg]">
              만료됨
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
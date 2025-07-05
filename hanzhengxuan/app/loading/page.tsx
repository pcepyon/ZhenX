'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useLoadingProgress } from '@/hooks/useLoadingProgress';
import { ProgressBar } from '@/components/ui/Progress';
import { LogoPulse } from '@/components/loading/LogoPulse';
import { ProcessSteps } from '@/components/loading/ProcessSteps';
import { LoadingMessages } from '@/components/loading/LoadingMessages';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const loadingSteps = [
  { id: 1, text: '고민 분석 완료', duration: 1000, icon: '🤔' },
  { id: 2, text: '패키지 매칭 중', duration: 1500, icon: '🎯' },
  { id: 3, text: '가격 최적화', duration: 1000, icon: '💰' },
  { id: 4, text: '최종 추천 준비', duration: 500, icon: '✨' }
];

const loadingMessages = [
  '너의 고민을 분석하고 있어...',
  '500개 중에서 딱 맞는 걸 찾는 중...',
  '가격도 꼼꼼히 비교하고 있어...',
  '거의 다 됐어! 조금만 기다려...'
];

export default function LoadingPage() {
  const router = useRouter();
  const { sessionId } = useAppStore();
  const { progress, currentStep, isError } = useLoadingProgress(loadingSteps);

  // Redirect if no session
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    }
  }, [sessionId, router]);

  // Handle error
  useEffect(() => {
    if (isError) {
      // TODO: Show error toast or redirect to error page
      console.error('Failed to generate recommendations');
    }
  }, [isError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col items-center justify-center px-5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-rose-100 to-pink-100 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="relative max-w-md w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoPulse />
        </motion.div>

        {/* Progress steps with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProcessSteps steps={loadingSteps} currentStep={currentStep} />
        </motion.div>

        {/* Enhanced Progress bar */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -top-2 right-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </motion.div>
            </div>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <motion.p 
              className="text-center text-sm font-medium text-gray-700 mt-3"
              key={Math.round(progress)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>

        {/* Rotating messages with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <LoadingMessages messages={loadingMessages} currentStep={currentStep} />
        </motion.div>

        {/* Fun loading indicator */}
        <motion.div 
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
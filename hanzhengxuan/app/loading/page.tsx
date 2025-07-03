'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useLoadingProgress } from '@/hooks/useLoadingProgress';
import { ProgressBar } from '@/components/ui/Progress';
import { LogoPulse } from '@/components/loading/LogoPulse';
import { ProcessSteps } from '@/components/loading/ProcessSteps';
import { LoadingMessages } from '@/components/loading/LoadingMessages';

const loadingSteps = [
  { id: 1, text: '고민 분석 완료', duration: 1000 },
  { id: 2, text: '패키지 매칭 중', duration: 1500 },
  { id: 3, text: '가격 최적화', duration: 1000 },
  { id: 4, text: '최종 추천 준비', duration: 500 }
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
    <div className="min-h-screen bg-gradient-to-b from-primary-mint-light/20 to-white flex flex-col items-center justify-center px-5">
      <div className="max-w-md w-full">
        {/* Logo animation */}
        <LogoPulse />

        {/* Progress steps */}
        <ProcessSteps steps={loadingSteps} currentStep={currentStep} />

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar value={progress} />
          <p className="text-center text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Rotating messages */}
        <LoadingMessages messages={loadingMessages} />
      </div>
    </div>
  );
}
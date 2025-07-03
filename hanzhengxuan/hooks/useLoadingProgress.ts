'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useRecommendations } from '@/hooks/api/useRecommendations';

interface LoadingStep {
  id: number;
  text: string;
  duration: number;
}

const DEFAULT_STEPS: LoadingStep[] = [
  { id: 1, text: '고민 분석 완료', duration: 1000 },
  { id: 2, text: '패키지 매칭 중', duration: 1500 },
  { id: 3, text: '가격 최적화', duration: 1000 },
  { id: 4, text: '최종 추천 준비', duration: 500 }
];

export function useLoadingProgress(steps = DEFAULT_STEPS) {
  const router = useRouter();
  const { sessionId, recommendations: storeRecommendations } = useAppStore();
  const { data: apiRecommendations, isSuccess, isError } = useRecommendations();
  
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Calculate total duration
  const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
  
  // Animate progress
  useEffect(() => {
    let elapsed = 0;
    let stepIndex = 0;
    let animationFrame: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Don't exceed 90% until API completes
      if (elapsed < totalDuration * 0.9 || isSuccess) {
        elapsed += deltaTime;
      }
      
      const percentage = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(percentage);
      
      // Update current step
      let cumulativeDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulativeDuration += steps[i].duration;
        if (elapsed <= cumulativeDuration) {
          if (stepIndex !== i) {
            stepIndex = i;
            setCurrentStep(i);
          }
          break;
        }
      }
      
      // Continue animation if not complete
      if (percentage < 100 || (!isSuccess && percentage >= 90)) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [totalDuration, steps, isSuccess]);
  
  // Handle API success
  useEffect(() => {
    if (isSuccess && progress >= 90) {
      // Quickly complete the progress
      const completeProgress = () => {
        setProgress(100);
        setCurrentStep(steps.length - 1);
        setIsComplete(true);
      };
      
      completeProgress();
      
      // Navigate after a short delay
      const timer = setTimeout(() => {
        router.push('/recommendations');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, progress, router, steps.length]);
  
  // Handle API error
  useEffect(() => {
    if (isError) {
      // TODO: Show error toast or redirect to error page
      console.error('Failed to load recommendations');
    }
  }, [isError]);
  
  // Check store recommendations as fallback
  useEffect(() => {
    if (storeRecommendations.length > 0 && progress >= 100) {
      router.push('/recommendations');
    }
  }, [storeRecommendations, progress, router]);
  
  return {
    progress,
    currentStep,
    isComplete,
    hasRecommendations: isSuccess || storeRecommendations.length > 0,
    isError
  };
}
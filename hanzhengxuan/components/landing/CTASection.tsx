'use client';

import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

export function CTASection({ onStartClick, isLoading }: CTASectionProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="max-w-md mx-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={onStartClick}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? '준비 중...' : '3분 만에 맞춤 패키지 찾기'}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          가입 필요 없어요 · 무료예요
        </p>
      </div>
    </div>
  );
}
'use client';

import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

export function HeroSection({ onStartClick, isLoading }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-16 text-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-mint-light/20 to-white -z-10" />
      
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">韩真选</h1>
        <p className="text-sm text-gray-600">한진선 · HANJINSEON</p>
      </div>
      
      {/* Main copy */}
      <div className="mb-12 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          언니가 직접 다녀온 한국 의료미용,<br />
          딱 3개만 추천해줄게
        </h2>
        <p className="text-base text-gray-600">
          复杂的比较 NO! 注册 NO! 3分钟就搞定
        </p>
      </div>
      
      {/* Benefits */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <span className="text-sm font-medium">✨ 3분 완성</span>
        </div>
        <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <span className="text-sm font-medium">🎁 10% 할인</span>
        </div>
        <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <span className="text-sm font-medium">🗣️ 중국어 OK</span>
        </div>
      </div>
      
      {/* CTA Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={onStartClick}
        disabled={isLoading}
        className="w-full max-w-xs"
      >
        {isLoading ? '준비 중...' : '지금 시작하기'}
      </Button>
      
      {/* Social proof */}
      <div className="mt-8 text-sm text-gray-500">
        <p>이미 <span className="font-semibold text-gray-700">2,341명</span>의 언니들이 사용했어요</p>
      </div>
    </section>
  );
}
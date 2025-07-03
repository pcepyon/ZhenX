'use client';

import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useCreateSession } from '@/hooks/api/useSession';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustBadges } from '@/components/landing/TrustBadges';
import { ServiceFeatures } from '@/components/landing/ServiceFeatures';
import { CTASection } from '@/components/landing/CTASection';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const setSessionId = useAppStore((state) => state.setSessionId);
  const { mutate: createSession, isPending } = useCreateSession();
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight * 0.8;
      setShowCTA(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartWizard = () => {
    createSession(
      { language: 'zh-CN' },
      {
        onSuccess: (data) => {
          setSessionId(data.session_id);
          router.push('/wizard/step1');
        },
        onError: (error) => {
          console.error('Failed to create session:', error);
          // TODO: Show error toast
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        onStartClick={handleStartWizard}
        isLoading={isPending}
      />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Service Features */}
      <ServiceFeatures />
      
      {/* Social Proof Section */}
      <section className="px-5 py-12 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h3 className="text-center text-lg font-bold text-gray-900 mb-8">
            언니들의 리얼 후기
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary-mint rounded-full flex items-center justify-center text-white font-bold text-sm">
                  L
                </div>
                <div>
                  <p className="font-semibold text-sm">Lily</p>
                  <p className="text-xs text-gray-500">2024.12</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "진짜 3분만에 끝났어요! 복잡한 시술 이름 몰라도 내 고민만 체크하니까 딱 맞는 패키지 추천해줘서 좋았어요."
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-secondary-coral rounded-full flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div>
                  <p className="font-semibold text-sm">Sunny</p>
                  <p className="text-xs text-gray-500">2024.11</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "10% 할인 자동으로 적용되고, 중국어로 상담할 수 있어서 너무 편했어요. 가격도 투명하고!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer for fixed CTA */}
      <div className="h-24" />
      
      {/* Fixed CTA */}
      {showCTA && (
        <CTASection
          onStartClick={handleStartWizard}
          isLoading={isPending}
        />
      )}
    </div>
  );
}
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
        onSuccess: (response) => {
          if (response.data) {
            setSessionId(response.data.session_id);
            router.push('/wizard/step1');
          }
        },
        onError: (error) => {
          console.error('Failed to create session:', error);
          // TODO: Show error toast
        }
      }
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-white">
      <HeroSection
        onStartClick={handleStartWizard}
        isLoading={isPending}
      />
    </div>
  );
}
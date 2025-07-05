'use client';

import { HeroCarousel } from './carousel/HeroCarousel';

interface HeroSectionProps {
  onStartClick: () => void;
  isLoading: boolean;
}

export function HeroSection({ onStartClick, isLoading }: HeroSectionProps) {
  return <HeroCarousel onStartClick={onStartClick} isLoading={isLoading} />;
}
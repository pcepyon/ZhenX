import { useCallback, useRef } from 'react';

interface SlideMetrics {
  slideId: string;
  viewStartTime: number;
  viewEndTime?: number;
  duration?: number;
  interactionType?: 'auto' | 'manual' | 'navigation';
}

interface CarouselMetrics {
  sessionId: string;
  startTime: number;
  endTime?: number;
  totalDuration?: number;
  slides: SlideMetrics[];
  completionRate: number;
  ctaClicked: boolean;
  manualInteractions: number;
}

export function useCarouselAnalytics() {
  const metricsRef = useRef<CarouselMetrics>({
    sessionId: `carousel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    slides: [],
    completionRate: 0,
    ctaClicked: false,
    manualInteractions: 0,
  });

  const currentSlideRef = useRef<SlideMetrics | null>(null);

  const trackSlideView = useCallback((slideId: string, interactionType: 'auto' | 'manual' | 'navigation' = 'auto') => {
    // End tracking for previous slide
    if (currentSlideRef.current && currentSlideRef.current.slideId !== slideId) {
      currentSlideRef.current.viewEndTime = Date.now();
      currentSlideRef.current.duration = currentSlideRef.current.viewEndTime - currentSlideRef.current.viewStartTime;
      metricsRef.current.slides.push(currentSlideRef.current);
    }

    // Start tracking new slide
    currentSlideRef.current = {
      slideId,
      viewStartTime: Date.now(),
      interactionType,
    };

    // Update completion rate
    const uniqueSlides = new Set(metricsRef.current.slides.map(s => s.slideId));
    uniqueSlides.add(slideId);
    metricsRef.current.completionRate = (uniqueSlides.size / 5) * 100; // Assuming 5 total slides

    // Track manual interactions
    if (interactionType === 'manual' || interactionType === 'navigation') {
      metricsRef.current.manualInteractions++;
    }
  }, []);

  const trackCTAClick = useCallback(() => {
    metricsRef.current.ctaClicked = true;
    sendAnalytics();
  }, []);

  const sendAnalytics = useCallback(() => {
    // End session
    metricsRef.current.endTime = Date.now();
    metricsRef.current.totalDuration = metricsRef.current.endTime - metricsRef.current.startTime;

    // End current slide tracking
    if (currentSlideRef.current) {
      currentSlideRef.current.viewEndTime = Date.now();
      currentSlideRef.current.duration = currentSlideRef.current.viewEndTime - currentSlideRef.current.viewStartTime;
      metricsRef.current.slides.push(currentSlideRef.current);
    }

    // Calculate average slide duration
    const totalSlideDuration = metricsRef.current.slides.reduce((sum, slide) => sum + (slide.duration || 0), 0);
    const avgSlideDuration = totalSlideDuration / metricsRef.current.slides.length;

    // Prepare analytics payload
    const analyticsData = {
      ...metricsRef.current,
      avgSlideDuration,
      engagementScore: calculateEngagementScore(metricsRef.current),
    };

    // Send to analytics service
    console.log('Carousel Analytics:', analyticsData);
    
    // In production, you would send this to your analytics service:
    // await fetch('/api/analytics/carousel', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(analyticsData),
    // });
  }, []);

  const calculateEngagementScore = (metrics: CarouselMetrics): number => {
    let score = 0;
    
    // Completion rate (0-40 points)
    score += metrics.completionRate * 0.4;
    
    // CTA click (0-30 points)
    if (metrics.ctaClicked) score += 30;
    
    // Time spent (0-20 points)
    const avgTimePerSlide = (metrics.totalDuration || 0) / metrics.slides.length;
    if (avgTimePerSlide > 3000) score += 20; // More than 3 seconds per slide
    else if (avgTimePerSlide > 2000) score += 10; // More than 2 seconds per slide
    
    // Manual interactions (0-10 points)
    if (metrics.manualInteractions > 0) score += Math.min(metrics.manualInteractions * 2, 10);
    
    return Math.round(score);
  };

  // Clean up on unmount
  const cleanup = useCallback(() => {
    if (metricsRef.current.slides.length > 0 && !metricsRef.current.endTime) {
      sendAnalytics();
    }
  }, [sendAnalytics]);

  return {
    trackSlideView,
    trackCTAClick,
    sendAnalytics,
    cleanup,
  };
}
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation, Keyboard, A11y } from 'swiper/modules';
import { EmpathySlide } from './slides/EmpathySlide';
import { LanguageSlide } from './slides/LanguageSlide';
import { PriceSlide } from './slides/PriceSlide';
import { TimeSlide } from './slides/TimeSlide';
import { CTASlide } from './slides/CTASlide';
import { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarouselAnalytics } from './useCarouselAnalytics';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/a11y';

interface HeroCarouselProps {
  onStartClick: () => void;
  isLoading: boolean;
}

export function HeroCarousel({ onStartClick, isLoading }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { trackSlideView, trackCTAClick, cleanup } = useCarouselAnalytics();

  const handleCTAClick = () => {
    trackCTAClick();
    onStartClick();
  };

  const slides = [
    { id: 'empathy', component: <EmpathySlide />, title: '共感' },
    { id: 'language', component: <LanguageSlide />, title: '沟通' },
    { id: 'price', component: <PriceSlide />, title: '价格' },
    { id: 'time', component: <TimeSlide />, title: '时间' },
    { id: 'cta', component: <CTASlide onStartClick={handleCTAClick} isLoading={isLoading} />, title: '行动' },
  ];

  // Track initial slide view
  useEffect(() => {
    trackSlideView(slides[0].id, 'auto');
    
    return () => {
      cleanup();
    };
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    
    // Track slide view
    const interactionType = swiper.touches.diff !== 0 ? 'manual' : 'auto';
    trackSlideView(slides[swiper.activeIndex].id, interactionType);
    
    // Stop autoplay on last slide
    if (swiper.activeIndex === slides.length - 1) {
      swiper.autoplay.stop();
      setIsAutoplayPaused(true);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      // Resume autoplay when manually navigating
      if (isAutoplayPaused && activeIndex < slides.length - 1) {
        swiperRef.current.autoplay.start();
        setIsAutoplayPaused(false);
      }
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      // Resume autoplay when manually navigating
      if (isAutoplayPaused && activeIndex < slides.length - 2) {
        swiperRef.current.autoplay.start();
        setIsAutoplayPaused(false);
      }
    }
  };

  const handleProgressClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      trackSlideView(slides[index].id, 'navigation');
      // Resume autoplay if not on last slide
      if (isAutoplayPaused && index < slides.length - 1) {
        swiperRef.current.autoplay.start();
        setIsAutoplayPaused(false);
      }
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[Autoplay, Pagination, EffectFade, Navigation, Keyboard, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={600}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: '上一张幻灯片',
          nextSlideMessage: '下一张幻灯片',
          firstSlideMessage: '这是第一张幻灯片',
          lastSlideMessage: '这是最后一张幻灯片',
          paginationBulletMessage: '转到幻灯片 {{index}}',
        }}
        onSlideChange={handleSlideChange}
        onAutoplayTimeLeft={(swiper, timeLeft, percentage) => {
          if (progressRef.current && !isAutoplayPaused) {
            progressRef.current.style.width = `${(1 - percentage) * 100}%`;
          }
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full w-full">
            {slide.component}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <AnimatePresence>
        {activeIndex > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeIndex < slides.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleProgressClick(index)}
              className="relative group"
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            >
              <div
                className={`
                  relative h-1 transition-all duration-300 overflow-hidden rounded-full
                  ${index === activeIndex ? 'w-12 bg-gray-200' : 'w-8 bg-gray-300 hover:bg-gray-400'}
                `}
              >
                {index === activeIndex && (
                  <div
                    ref={index === activeIndex ? progressRef : null}
                    className="absolute left-0 top-0 h-full bg-gray-700 transition-all duration-100"
                    style={{ width: '0%' }}
                  />
                )}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {slide.title}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Slide counter for mobile */}
        <div className="text-center mt-2 text-xs text-gray-500 md:hidden">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>

      {/* Pause/Play indicator */}
      <AnimatePresence>
        {isAutoplayPaused && activeIndex < slides.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 z-30 text-xs text-gray-500 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            自动播放已暂停
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .swiper-slide {
          opacity: 0 !important;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .swiper-slide-active {
          opacity: 1 !important;
        }

        /* Improve touch responsiveness */
        @media (hover: none) and (pointer: coarse) {
          .swiper {
            touch-action: pan-y pinch-zoom;
          }
        }
      `}</style>
    </div>
  );
}
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function EmpathySlide() {
  const [phase, setPhase] = useState(1);
  const [count, setCount] = useState(0);
  const targetCount = 12847;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 1) setPhase(2); // 0.8초 후 Phase 2로
      else if (phase === 2) setPhase(3); // 2.0초 후 Phase 3로 (숫자 카운팅)
      else if (phase === 3) setPhase(4); // 3.0초 후 Phase 4로
    }, phase === 1 ? 800 : phase === 2 ? 1200 : 1000);

    return () => clearTimeout(timer);
  }, [phase]);

  // 숫자 카운팅 애니메이션
  useEffect(() => {
    if (phase === 3) {
      const duration = 800; // 0.8초 동안 카운팅
      const steps = 50;
      const increment = targetCount / steps;
      let currentStep = 0;

      const counter = setInterval(() => {
        if (currentStep < steps) {
          currentStep++;
          setCount(Math.floor(increment * currentStep));
        } else {
          setCount(targetCount);
          clearInterval(counter);
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }
  }, [phase]);

  // 타이핑 효과를 위한 컴포넌트
  const TypingText = ({ text, className = "", highlightText = "" }: { text: string; className?: string; highlightText?: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }, [text]);

    // 강조할 텍스트가 있으면 하이라이트 처리
    if (highlightText && displayedText.includes(highlightText)) {
      const parts = displayedText.split(highlightText);
      return (
        <span className={className}>
          {parts[0]}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-medium">
            {highlightText}
          </span>
          {parts[1]}
        </span>
      );
    }

    return <span className={className}>{displayedText}</span>;
  };

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-slate-100" />
      </motion.div>

      {/* Content Container */}
      <div className="relative min-h-[500px] flex flex-col items-center justify-center px-6 max-w-4xl">
        
        {/* Phase 1-2: 상단 영역 */}
        <div className="h-[80px] flex items-center">
          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <TypingText text="真的可以相信吗？" className="text-xl text-gray-500" />
              </motion.div>
            )}
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <TypingText 
                  text="在韩国，已经有很多中国人正在变美" 
                  className="text-2xl text-gray-700"
                  highlightText="正在变美"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase 3: 숫자 카운터 (중앙 위치로 이동) */}
        <div className="h-[120px] flex items-center">
          {/* Phase 2의 텍스트가 여기에 표시되므로 비워둠 */}
        </div>

        {/* Phase 3: 숫자 카운터 */}
        <div className="h-[100px] flex items-center">
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <span className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {count.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-600 ml-2">人的选择</span>
                </motion.div>
                
                {/* 숫자 도달 시 파티클 효과 */}
                {count === targetCount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-emerald-400/20"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase 4: 하단 연결 텍스트 */}
        <div className="h-[60px] flex items-end">
          <AnimatePresence>
            {phase >= 4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-gray-600"
              >
                这是怎么做到的？
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block ml-1"
                >
                  →
                </motion.span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe indicator - phase 4에서만 표시 */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center text-gray-400"
              >
                <span className="text-sm mb-2">滑动继续</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
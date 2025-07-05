'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingMessagesProps {
  messages: string[];
  currentStep?: number;
  interval?: number;
}

export function LoadingMessages({ messages, currentStep = 0, interval = 3000 }: LoadingMessagesProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    // Sync message with current step when possible
    if (currentStep < messages.length) {
      setMessageIndex(currentStep);
    }
  }, [currentStep, messages.length]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [messages, interval]);
  
  return (
    <div className="text-center min-h-[60px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Message background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full blur-xl opacity-30" />
          
          {/* Message text */}
          <p className="relative text-base md:text-lg text-gray-700 font-medium px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
            {messages[messageIndex]}
          </p>
          
          {/* Decorative elements */}
          <motion.div
            className="absolute -right-2 -top-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-xl">💭</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Message dots indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1">
        {messages.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === messageIndex 
                ? 'bg-emerald-500 w-4' 
                : 'bg-gray-300'
            }`}
            animate={index === messageIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}
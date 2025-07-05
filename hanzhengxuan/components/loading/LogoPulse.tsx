'use client';

import { motion } from 'framer-motion';

interface LogoPulseProps {
  title?: string;
  subtitle?: string;
}

export function LogoPulse({ 
  title = '韩真选', 
  subtitle = 'AI가 분석 중이야' 
}: LogoPulseProps) {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        {/* Animated rings */}
        <motion.div className="absolute inset-0 -m-8">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-emerald-300"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-teal-300"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-emerald-200"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.3, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1
            }}
          />
        </motion.div>
        
        {/* Logo card with gradient */}
        <motion.div 
          className="relative bg-white rounded-3xl px-10 py-8 shadow-2xl overflow-hidden"
          animate={{
            boxShadow: [
              "0 20px 25px -5px rgb(0 0 0 / 0.1)",
              "0 25px 30px -5px rgb(0 0 0 / 0.15)",
              "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-teal-50 opacity-50" />
          
          {/* Content */}
          <motion.h1 
            className="relative text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-600 mt-3 font-medium">
              {subtitle}
            </p>
            
            {/* AI indicator */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <motion.div
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              <span className="text-xs text-gray-500">AI 분석 중</span>
              <motion.div
                className="w-2 h-2 bg-teal-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
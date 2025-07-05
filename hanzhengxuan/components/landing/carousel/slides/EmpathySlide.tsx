'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function EmpathySlide() {
  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Parallax background with mirror silhouette effect */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        
        {/* Blurred silhouette effect */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 max-w-3xl z-10"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-light text-gray-800 mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          每天照镜子时
          <br />
          <span className="text-gray-600">总在意的那个部位</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          想在韩国做医疗美容... 却不知道从哪里开始？
        </motion.p>

        {/* Swipe indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
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
      </motion.div>
    </div>
  );
}
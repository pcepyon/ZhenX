'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LanguageSlide() {
  const [consultCount, setConsultCount] = useState(3421);

  useEffect(() => {
    const interval = setInterval(() => {
      setConsultCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const chatMessages = [
    { id: 1, text: "你好！我想了解双眼皮手术", sender: "user" },
    { id: 2, text: "您好！我是您的专属顾问，很高兴为您服务", sender: "consultant" },
    { id: 3, text: "我们有多种双眼皮手术方案...", sender: "consultant" },
  ];

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 -z-10" />

      {/* Content */}
      <div className="w-full max-w-5xl px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-light text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            第一个不安
            <br />
            <span className="text-emerald-600">语言沟通？没问题！</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            中文咨询，让你像在家一样舒适
          </motion.p>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">中文咨询 OK</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">专业翻译 24小时</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">实时响应</span>
            </motion.div>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-sm text-gray-500">
              已经有 <span className="font-semibold text-emerald-600">{consultCount.toLocaleString()}</span> 位中国姐妹
              <br />
              通过中文咨询找到了完美方案
            </p>
          </motion.div>
        </motion.div>

        {/* Right side - Chat preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-gray-500 ml-2">实时对话</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-center text-xs text-gray-400"
            >
              专业医疗顾问实时在线
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
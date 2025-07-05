'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Star, Users, Shield, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CTASlideProps {
  onStartClick: () => void;
  isLoading: boolean;
}

export function CTASlide({ onStartClick, isLoading }: CTASlideProps) {
  const [userCount, setUserCount] = useState(1234);
  const [showNotification, setShowNotification] = useState(false);
  
  const cities = ['上海', '北京', '广州', '深圳', '成都', '杭州'];
  const [currentCity, setCurrentCity] = useState(cities[0]);

  useEffect(() => {
    // Update user count
    const countInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);

    // Show notification periodically
    const notifInterval = setInterval(() => {
      setShowNotification(true);
      setCurrentCity(cities[Math.floor(Math.random() * cities.length)]);
      setTimeout(() => setShowNotification(false), 4000);
    }, 10000);

    return () => {
      clearInterval(countInterval);
      clearInterval(notifInterval);
    };
  }, []);

  const trustPoints = [
    { icon: Shield, text: '检证医院', subtext: '仅合作正规医院' },
    { icon: Globe, text: '透明价格', subtext: '无隐藏费用' },
    { icon: Users, text: '中文服务', subtext: '全程母语沟通' },
  ];

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Gradient background with subtle animation */}
      <motion.div 
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'linear-gradient(to bottom right, #ffffff, #f9fafb)',
            'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
            'linear-gradient(to bottom right, #ffffff, #f9fafb)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Real-time notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center gap-3 max-w-xs"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm text-gray-600">
              刚刚来自{currentCity}的姐妹获得了专属方案
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* User count */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-gray-500 mb-2">已经有</p>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {userCount.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">位姐妹选择了韩真选</p>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-light text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            准备好
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              遇见更美的自己了吗？
            </span>
          </motion.h1>

          {/* Trust points */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.text}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full flex items-center justify-center mb-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </motion.div>
                  <div className="text-sm font-medium text-gray-800">{point.text}</div>
                  <div className="text-xs text-gray-500">{point.subtext}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button with pulse effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="relative inline-block"
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(52, 211, 153, 0.4)',
                  '0 0 0 20px rgba(52, 211, 153, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            <Button
              variant="primary"
              size="lg"
              onClick={onStartClick}
              disabled={isLoading}
              className="relative px-12 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isLoading ? '准备中...' : '3分钟获取专属方案'}
            </Button>
          </motion.div>

          {/* Subtext */}
          <motion.div
            className="mt-6 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-sm text-gray-500">
              无需注册，立即开始
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-500 ml-1">4.9/5 (2,341条评价)</span>
            </div>
          </motion.div>

          {/* Security badges */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              隐私保护
            </div>
            <div className="text-xs text-gray-400">|</div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              官方认证
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
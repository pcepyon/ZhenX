'use client';

import { motion } from 'framer-motion';
import { Check, Shield, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PriceSlide() {
  const [savings, setSavings] = useState(0);
  const [showCNY, setShowCNY] = useState(false);
  
  const originalPrice = 3000000; // KRW
  const packagePrice = 2700000; // KRW
  const exchangeRate = 0.0052; // KRW to CNY

  useEffect(() => {
    const targetSavings = originalPrice - packagePrice;
    const increment = targetSavings / 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetSavings) {
        setSavings(targetSavings);
        clearInterval(timer);
      } else {
        setSavings(Math.floor(current));
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    if (showCNY) {
      return `¥${Math.floor(price * exchangeRate).toLocaleString()}`;
    }
    return `₩${price.toLocaleString()}`;
  };

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />

      {/* Content */}
      <div className="w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-light text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            第二个不安
            <br />
            <span className="text-blue-600">价格透明，拒绝套路</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            明码标价，包含所有费用，无隐藏消费
          </motion.p>

          {/* Price comparison */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Other companies */}
            <motion.div 
              className="bg-gray-50 rounded-2xl p-6 relative"
              whileHover={{ y: -2 }}
            >
              <h3 className="text-sm text-gray-500 mb-3">其他中介</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-400">基础手术费</p>
                <p className="text-gray-400">+ 翻译费</p>
                <p className="text-gray-400">+ 接送费</p>
                <p className="text-gray-400">+ 服务费</p>
                <p className="text-gray-400">+ ???</p>
              </div>
              <div className="text-2xl text-gray-400">总价不透明</div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl text-gray-300"
            >
              →
            </motion.div>

            {/* ZhenX */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg relative"
              whileHover={{ y: -2, shadow: "xl" }}
            >
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                推荐
              </div>
              <h3 className="text-sm text-blue-600 mb-3 font-medium">韩真选套餐价</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>手术费用</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>专业翻译</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>VIP接送</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>术后护理</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</div>
              <div className="text-3xl font-medium text-blue-600">{formatPrice(packagePrice)}</div>
              <div className="text-sm text-gray-500 mt-1">含VAT，一价全包</div>
            </motion.div>
          </motion.div>

          {/* Savings calculator */}
          <motion.div
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">节省金额</span>
              </div>
              <motion.div 
                className="text-2xl font-bold text-green-600"
                key={savings}
              >
                {formatPrice(savings)}
              </motion.div>
            </div>
          </motion.div>

          {/* Currency toggle */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <button
              onClick={() => setShowCNY(!showCNY)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span>切换货币</span>
              <span className="font-medium">{showCNY ? 'CNY ¥' : 'KRW ₩'}</span>
            </button>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">正规医院定价认证</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
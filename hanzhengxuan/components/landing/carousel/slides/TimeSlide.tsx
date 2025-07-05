'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, ShoppingBag, Coffee } from 'lucide-react';

export function TimeSlide() {
  const timeline = [
    { time: '09:00', icon: Coffee, label: '医院到达', description: '专车接送' },
    { time: '09:30', icon: Clock, label: '开始手术', description: '专业团队' },
    { time: '12:00', icon: MapPin, label: '全部完成', description: '休息恢复' },
    { time: '13:00', icon: ShoppingBag, label: '自由活动', description: '明洞购物' },
  ];

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50 -z-10" />

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
            第三个不安
            <br />
            <span className="text-rose-600">时间高效，当天完成</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            上午手术，下午就能去逛街
          </motion.p>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            />

            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.2 }}
                    className="relative"
                  >
                    {/* Icon circle */}
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-8 h-8 text-rose-500" />
                    </motion.div>

                    {/* Time */}
                    <motion.div
                      className="text-2xl font-medium text-gray-800 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.2 }}
                    >
                      {item.time}
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      className="text-sm font-medium text-gray-700 mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      {item.label}
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      className="text-xs text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + index * 0.2 }}
                    >
                      {item.description}
                    </motion.div>

                    {/* Connecting arrow (mobile) */}
                    {index < timeline.length - 1 && (
                      <motion.div
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-300 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.2 }}
                      >
                        ↓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Calendar emphasis */}
          <motion.div
            className="mt-12 inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-3 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="text-lg font-medium text-gray-800">仅需一天</span>
            <span className="text-sm text-gray-600">轻松完成所有流程</span>
          </motion.div>

          {/* Real testimonial card */}
          <motion.div
            className="mt-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600 italic">
                "早上做完手术，下午还去明洞买了好多化妆品！效率超高~"
              </p>
              <p className="text-xs text-gray-400 mt-2">- 来自上海的小美</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HospitalInfoButtonProps {
  onClick: () => void;
}

export function HospitalInfoButton({ onClick }: HospitalInfoButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 펄스 애니메이션 배경 */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-pulse" />
      
      {/* 메인 버튼 */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-lg font-medium text-gray-800 mb-1 flex items-center gap-2">
              <span className="text-xl">🏥</span>
              병원 신뢰도 확인하기
            </h3>
            <p className="text-sm text-gray-600">
              안심하고 선택하세요
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </motion.button>
  );
}
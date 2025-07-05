import React from 'react';

// 시술 카테고리별 아이콘 컴포넌트
export const treatmentIcons = {
  lifting: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  elasticity: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  wrinkle: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  volume: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z" />
    </svg>
  ),
  hydration: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  pigment: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  body: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
};

export function getTreatmentIcon(iconType: string | null | undefined) {
  if (!iconType || !(iconType in treatmentIcons)) {
    // 기본 아이콘
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  
  return treatmentIcons[iconType as keyof typeof treatmentIcons];
}

// 카테고리별 색상 클래스
export const categoryColors: Record<string, string> = {
  lifting: 'text-blue-600 bg-blue-50',
  elasticity: 'text-purple-600 bg-purple-50',
  wrinkle: 'text-pink-600 bg-pink-50',
  volume: 'text-orange-600 bg-orange-50',
  hydration: 'text-cyan-600 bg-cyan-50',
  pigment: 'text-amber-600 bg-amber-50',
  body: 'text-green-600 bg-green-50',
  default: 'text-gray-600 bg-gray-50'
};
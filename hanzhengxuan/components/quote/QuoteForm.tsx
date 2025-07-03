'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PersonalInfo {
  name?: string;
  visit_date?: string;
  memo?: string;
}

interface QuoteFormProps {
  onInfoChange: (info: PersonalInfo) => void;
  className?: string;
}

export function QuoteForm({ onInfoChange, className }: QuoteFormProps) {
  const [info, setInfo] = useState<PersonalInfo>({
    name: '',
    visit_date: '',
    memo: ''
  });
  
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const newInfo = { ...info, [field]: value };
    setInfo(newInfo);
    onInfoChange(newInfo);
  };
  
  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get max date (90 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-5", className)}>
      <h3 className="font-semibold text-gray-900 mb-4">
        추가 정보 (선택사항)
      </h3>
      
      <div className="space-y-4">
        {/* Name input */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={info.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="예: 김민지"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mint focus:border-primary-mint"
          />
          <p className="text-xs text-gray-500 mt-1">
            견적서에 표시될 이름입니다
          </p>
        </div>
        
        {/* Visit date input */}
        <div>
          <label 
            htmlFor="visit_date" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            방문 예정일
          </label>
          <input
            type="date"
            id="visit_date"
            value={info.visit_date}
            onChange={(e) => handleChange('visit_date', e.target.value)}
            min={today}
            max={maxDateStr}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mint focus:border-primary-mint"
          />
          <p className="text-xs text-gray-500 mt-1">
            한국 방문 예정일을 선택해주세요
          </p>
        </div>
        
        {/* Memo textarea */}
        <div>
          <label 
            htmlFor="memo" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            메모
          </label>
          <textarea
            id="memo"
            value={info.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            placeholder="추가로 전달하고 싶은 내용을 작성해주세요"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mint focus:border-primary-mint resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            특별한 요청사항이나 문의사항을 남겨주세요
          </p>
        </div>
      </div>
      
      {/* Privacy notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <svg 
            className="inline-block w-3 h-3 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
          입력하신 정보는 견적서 생성에만 사용되며, 7일 후 자동으로 삭제됩니다.
        </p>
      </div>
    </div>
  );
}
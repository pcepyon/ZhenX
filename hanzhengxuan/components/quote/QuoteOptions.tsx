'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuoteOption {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

interface QuoteOptionsProps {
  onOptionsChange?: (options: Record<string, boolean>) => void;
  className?: string;
}

export function QuoteOptions({ onOptionsChange, className }: QuoteOptionsProps) {
  const [options, setOptions] = useState<QuoteOption[]>([
    {
      id: 'include_transportation',
      label: '교통편 정보 포함',
      description: '병원까지 가는 방법 안내',
      checked: true
    },
    {
      id: 'include_preparation',
      label: '시술 전 준비사항 포함',
      description: '시술 전 주의사항 안내',
      checked: true
    },
    {
      id: 'share_link',
      label: '공유 링크 생성',
      description: '카카오톡, 위챗으로 공유 가능',
      checked: false
    }
  ]);
  
  const handleToggle = (optionId: string) => {
    const newOptions = options.map(opt => 
      opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
    );
    setOptions(newOptions);
    
    // Convert to simple object for parent
    const optionsObject = newOptions.reduce((acc, opt) => ({
      ...acc,
      [opt.id]: opt.checked
    }), {});
    
    onOptionsChange?.(optionsObject);
  };
  
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-5", className)}>
      <h3 className="font-semibold text-gray-900 mb-4">
        견적서 옵션
      </h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={option.checked}
              onChange={() => handleToggle(option.id)}
              className="mt-1 w-4 h-4 text-primary-mint border-gray-300 rounded focus:ring-primary-mint"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 group-hover:text-primary-mint transition-colors">
                {option.label}
              </p>
              <p className="text-sm text-gray-600">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      
      {/* Info box */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          견적서는 발급일로부터 7일간 유효하며, 웹 링크로 언제든지 조회할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
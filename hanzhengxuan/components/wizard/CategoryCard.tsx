'use client';

import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export function CategoryCard({
  id,
  name,
  icon,
  description,
  selected,
  disabled = false,
  onSelect
}: CategoryCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'relative w-full p-4 rounded-xl border-2 transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        'focus:outline-none focus:ring-2 focus:ring-primary-mint focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none',
        selected ? [
          'border-primary-mint bg-primary-mint-light/10',
          'shadow-lg'
        ] : [
          'border-gray-200 bg-white',
          'hover:border-gray-300'
        ]
      )}
      aria-pressed={selected}
      aria-label={`${name} - ${description}`}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-mint rounded-full flex items-center justify-center">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path 
              d="M13.5 4.5L6 12L2.5 8.5" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      
      {/* Icon */}
      <div className="text-4xl mb-3">{icon}</div>
      
      {/* Name */}
      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
      
      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      
      {/* Disabled overlay message */}
      {disabled && !selected && (
        <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
          <p className="text-xs text-gray-500 px-2 text-center">최대 3개까지만 선택 가능해요</p>
        </div>
      )}
    </button>
  );
}
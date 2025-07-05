'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative w-full p-6 rounded-2xl border transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        selected ? [
          'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50',
          'shadow-lg shadow-emerald-100'
        ] : [
          'border-gray-200 bg-white',
          'hover:border-gray-300 hover:shadow-md hover:shadow-gray-100'
        ]
      )}
      aria-pressed={selected}
      aria-label={`${name} - ${description}`}
    >
      {/* Gradient border effect when selected */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-10" />
      )}
      
      {/* Selection indicator */}
      {selected && (
        <motion.div 
          className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
      
      {/* Icon */}
      <motion.div 
        className="text-5xl mb-4"
        animate={{ scale: selected ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      
      {/* Name */}
      <h3 className={cn(
        "font-medium text-lg mb-2 transition-colors",
        selected ? "text-gray-900" : "text-gray-800"
      )}>
        {name}
      </h3>
      
      {/* Description */}
      <p className={cn(
        "text-sm leading-relaxed transition-colors",
        selected ? "text-gray-700" : "text-gray-600"
      )}>
        {description}
      </p>
      
      {/* Hover effect overlay */}
      {!selected && !disabled && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 hover:opacity-5 transition-opacity" />
      )}
      
      {/* Disabled overlay message */}
      {disabled && !selected && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <p className="text-xs text-gray-500 px-3 text-center">최대 3개까지만 선택 가능해요</p>
        </div>
      )}
    </motion.button>
  );
}
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ConcernItemProps {
  id: string;
  name: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

export function ConcernItem({
  id,
  name,
  description,
  checked,
  onChange
}: ConcernItemProps) {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full px-5 py-4 rounded-xl border transition-all duration-200 text-left",
        "focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
        checked ? [
          "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-300",
          "shadow-md shadow-rose-100"
        ] : [
          "bg-white border-gray-200",
          "hover:border-gray-300 hover:shadow-sm"
        ]
      )}
    >
      <div className="flex items-start gap-3">
        {/* Custom radio button */}
        <div className={cn(
          "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
          checked ? "border-rose-500 bg-rose-500" : "border-gray-300 bg-white"
        )}>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>
        
        <div className="flex-1">
          <div className={cn(
            "font-medium transition-colors",
            checked ? "text-gray-900" : "text-gray-800"
          )}>
            {name}
          </div>
          {description && (
            <div className={cn(
              "text-sm mt-1 transition-colors",
              checked ? "text-gray-700" : "text-gray-600"
            )}>
              {description}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
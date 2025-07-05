'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PersonalFactorItemProps {
  id: string;
  label: string;
  description: string;
  icon: string;
  color?: string;
  checked: boolean;
  onChange: () => void;
}

export function PersonalFactorItem({
  id,
  label,
  description,
  icon,
  color = 'from-gray-500 to-gray-600',
  checked,
  onChange
}: PersonalFactorItemProps) {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-5 rounded-2xl border transition-all duration-300 text-left group",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        checked ? [
          "bg-white border-gray-300",
          "shadow-lg"
        ] : [
          "bg-white/80 border-gray-200",
          "hover:bg-white hover:border-gray-300 hover:shadow-md"
        ]
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon with gradient background */}
        <div className={cn(
          "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all",
          checked ? "scale-110" : "scale-100"
        )}>
          {/* Gradient background */}
          <div className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-r opacity-10",
            color,
            checked && "opacity-20"
          )} />
          
          {/* Icon */}
          <span className="relative text-2xl">{icon}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className={cn(
                "font-medium transition-colors",
                checked ? "text-gray-900" : "text-gray-800"
              )}>
                {label}
              </h4>
              <p className={cn(
                "text-sm mt-1 transition-colors",
                checked ? "text-gray-700" : "text-gray-600"
              )}>
                {description}
              </p>
            </div>
            
            {/* Custom checkbox */}
            <div className={cn(
              "mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
              checked ? [
                "border-transparent bg-gradient-to-r",
                color
              ] : "border-gray-300 bg-white"
            )}>
              {checked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      {!checked && (
        <div className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none",
          color
        )} />
      )}
    </motion.button>
  );
}
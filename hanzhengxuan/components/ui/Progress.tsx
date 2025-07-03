'use client'

import React from 'react'

interface ProgressDotsProps {
  total: number
  current: number
  className?: string
}

export function ProgressDots({ total, current, className = '' }: ProgressDotsProps) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`
            h-2 rounded-full transition-all duration-300
            ${i < current 
              ? 'w-8 bg-primary-mint' 
              : i === current 
                ? 'w-8 bg-primary-mint' 
                : 'w-2 bg-gray-300'
            }
          `}
          role="progressbar"
          aria-valuenow={i < current ? 100 : i === current ? 50 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      ))}
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className = '',
  showLabel = false 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">进度</span>
          <span className="text-sm font-medium text-gray-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div 
        className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-primary-mint transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
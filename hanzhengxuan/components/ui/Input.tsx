'use client'

import React from 'react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-center cursor-pointer min-h-[48px] ${className}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        {...props}
      />
      <div className="
        relative w-6 h-6 
        border-2 border-gray-300 rounded-md
        peer-checked:bg-primary-mint peer-checked:border-primary-mint
        transition-all duration-200
        flex items-center justify-center
      ">
        <svg
          className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      {label && (
        <span className="ml-3 text-gray-700 select-none">{label}</span>
      )}
    </label>
  )
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={`flex items-center cursor-pointer min-h-[48px] ${className}`}>
      <input
        type="radio"
        className="sr-only peer"
        {...props}
      />
      <div className="
        relative w-6 h-6 
        border-2 border-gray-300 rounded-full
        peer-checked:border-primary-mint
        transition-all duration-200
        flex items-center justify-center
      ">
        <div className="
          w-3 h-3 rounded-full bg-primary-mint
          opacity-0 peer-checked:opacity-100
          transition-opacity duration-200
        " />
      </div>
      {label && (
        <span className="ml-3 text-gray-700 select-none">{label}</span>
      )}
    </label>
  )
}

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
}

export function Slider({ 
  label, 
  showValue = true,
  className = '', 
  value = 0,
  min = 0,
  max = 100,
  ...props 
}: SliderProps) {
  const percentage = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && <span className="text-gray-700">{label}</span>}
          {showValue && <span className="text-sm font-medium text-gray-900">{value}</span>}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          className="
            w-full h-2 
            bg-gray-200 rounded-full 
            appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-mint
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-mint
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:transition-transform
            [&::-moz-range-thumb]:hover:scale-110
          "
          value={value}
          min={min}
          max={max}
          {...props}
        />
        <div 
          className="absolute top-0 left-0 h-2 bg-primary-mint rounded-full pointer-events-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
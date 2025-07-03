'use client'

import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  selected?: boolean
  children: React.ReactNode
}

export function Card({
  hoverable = false,
  selected = false,
  className = '',
  onClick,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        border
        p-6
        transition-all duration-200
        ${selected ? 'border-primary-mint border-2 shadow-lg' : 'border-gray-200'}
        ${hoverable ? 'hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e as any)
        }
      } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
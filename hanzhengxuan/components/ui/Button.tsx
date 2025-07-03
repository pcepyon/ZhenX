'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'lg' | 'md' | 'sm'
  loading?: boolean
  children: React.ReactNode
}

const sizeClasses = {
  lg: 'h-14 px-8 text-lg font-medium',
  md: 'h-12 px-6 text-base font-medium',
  sm: 'h-10 px-4 text-sm font-medium'
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: disabled ? 'var(--gray-300)' : isHovered ? 'var(--primary-mint-dark)' : 'var(--primary-mint)',
        color: 'white',
        border: 'none'
      }
    } else if (variant === 'secondary') {
      return {
        backgroundColor: isHovered ? 'var(--primary-mint)' : 'transparent',
        color: isHovered ? 'white' : 'var(--primary-mint)',
        border: disabled ? '2px solid var(--gray-300)' : '2px solid var(--primary-mint)',
        ...(disabled && { color: 'var(--gray-300)' })
      }
    } else {
      return {
        backgroundColor: isHovered ? 'var(--gray-100)' : 'transparent',
        color: disabled ? 'var(--gray-300)' : isHovered ? 'var(--gray-900)' : 'var(--gray-700)',
        border: 'none'
      }
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    onMouseLeave?.(e)
  }

  return (
    <button
      className={`${sizeClasses[size]} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-lg)',
        transition: 'all 150ms',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        minWidth: '48px',
        ...getVariantStyles(),
        ...style
      }}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg
            className="animate-spin"
            style={{ width: '1.25rem', height: '1.25rem' }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>加载中...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  position?: 'center' | 'bottom'
  children: React.ReactNode
}

export function Modal({
  open,
  onClose,
  position = 'center',
  children
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, onClose])

  if (!open) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`
          relative
          bg-white
          rounded-2xl
          shadow-xl
          max-w-[calc(100vw-2rem)]
          max-h-[calc(100vh-4rem)]
          overflow-hidden
          animate-in
          ${position === 'center' 
            ? 'w-full max-w-md' 
            : 'fixed bottom-0 left-0 right-0 rounded-b-none max-h-[80vh]'
          }
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="关闭"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  )

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}
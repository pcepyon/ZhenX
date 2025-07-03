'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  height?: 'auto' | 'full'
  children: React.ReactNode
}

export function BottomSheet({
  open,
  onClose,
  height = 'auto',
  children
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current
    
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    if (dragY > 100) {
      onClose()
    }
    setDragY(0)
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY
    setIsDragging(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const diff = e.clientY - startY.current
    
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleMouseUp = () => {
    if (dragY > 100) {
      onClose()
    }
    setDragY(0)
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragY])

  if (!open) return null

  const sheetContent = (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in"
        onClick={onClose}
        style={{
          opacity: dragY > 0 ? 1 - dragY / 500 : 1
        }}
      />
      
      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0
          bg-white
          rounded-t-2xl
          shadow-xl
          transition-transform
          ${!isDragging ? 'duration-300' : ''}
          ${height === 'full' ? 'h-[calc(100vh-5rem)]' : 'max-h-[80vh]'}
        `}
        style={{
          transform: `translateY(${dragY}px)`
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Drag Handle */}
        <div
          className="sticky top-0 flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(100%-2rem)]">
          {children}
        </div>
      </div>
    </div>
  )

  if (typeof window !== 'undefined') {
    return createPortal(sheetContent, document.body)
  }

  return null
}
'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

interface SessionResponse {
  success: boolean
  data?: {
    session_id: string
    expires_at: string
  }
  error?: string
}

export function useSession() {
  const { sessionId, setSessionId } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initSession = async () => {
    // If we already have a session ID, don't create a new one
    if (sessionId) {
      return sessionId
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/sessions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          language: 'zh-CN',
          referrer: typeof window !== 'undefined' ? window.location.href : undefined
        }),
      })
      
      const data: SessionResponse = await response.json()
      
      if (data.success && data.data) {
        setSessionId(data.data.session_id)
        return data.data.session_id
      } else {
        throw new Error(data.error || 'Failed to create session')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Session initialization error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-initialize session on mount
  useEffect(() => {
    if (!sessionId) {
      initSession()
    }
  }, [])

  return { 
    sessionId, 
    initSession,
    isLoading,
    error,
    hasSession: !!sessionId
  }
}
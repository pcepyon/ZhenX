import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Validate if a string is a valid UUID v4
 */
export function validateSessionId(sessionId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(sessionId)
}

/**
 * Get session ID from request cookies
 */
export async function getSessionFromCookie(request: NextRequest): Promise<string | null> {
  const sessionId = request.cookies.get('session_id')?.value
  
  if (!sessionId || !validateSessionId(sessionId)) {
    return null
  }
  
  return sessionId
}

/**
 * Verify session is valid and not expired
 */
export async function verifySession(sessionId: string): Promise<boolean> {
  if (!validateSessionId(sessionId)) {
    return false
  }
  
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('user_sessions')
      .select('expires_at')
      .eq('session_id', sessionId)
      .single()
    
    if (error || !data) {
      return false
    }
    
    // Check if session is expired
    const expiresAt = new Date(data.expires_at)
    return expiresAt > new Date()
  } catch (error) {
    console.error('Session verification error:', error)
    return false
  }
}

/**
 * Get or create session for a request
 */
export async function getOrCreateSession(request: NextRequest): Promise<string | null> {
  // First try to get existing session
  const existingSession = await getSessionFromCookie(request)
  
  if (existingSession) {
    const isValid = await verifySession(existingSession)
    if (isValid) {
      return existingSession
    }
  }
  
  // Create new session if none exists or invalid
  try {
    const response = await fetch(new URL('/api/v1/sessions', request.url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Forwarded-For': request.headers.get('x-forwarded-for') || '',
        'X-Real-IP': request.headers.get('x-real-ip') || ''
      },
      body: JSON.stringify({
        language: 'zh-CN'
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.data?.session_id || null
    }
  } catch (error) {
    console.error('Failed to create session:', error)
  }
  
  return null
}
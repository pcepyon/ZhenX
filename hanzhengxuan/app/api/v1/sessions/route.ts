import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json().catch(() => ({}))
    
    // Get client information
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIp || '0.0.0.0'
    
    // Create session in database
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        user_agent: userAgent,
        ip_address: ipAddress,
        language: body.language || 'zh-CN',
        country_code: request.geo?.country || 'CN'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Session creation error:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create session' 
        },
        { status: 500 }
      )
    }
    
    // Create response with session data
    const response = NextResponse.json({
      success: true,
      data: {
        session_id: data.session_id,
        expires_at: data.expires_at
      }
    })
    
    // Set session cookie
    response.cookies.set('session_id', data.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get session ID from cookie
    const sessionId = request.cookies.get('session_id')?.value
    
    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: 'No session found'
      }, { status: 404 })
    }
    
    const supabase = await createClient()
    
    // Verify session exists and is not expired
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single()
    
    if (error || !data) {
      return NextResponse.json({
        success: false,
        error: 'Session not found'
      }, { status: 404 })
    }
    
    // Check if session is expired
    const expiresAt = new Date(data.expires_at)
    if (expiresAt < new Date()) {
      return NextResponse.json({
        success: false,
        error: 'Session expired'
      }, { status: 401 })
    }
    
    return NextResponse.json({
      success: true,
      data: {
        session_id: data.session_id,
        expires_at: data.expires_at,
        language: data.language,
        country_code: data.country_code
      }
    })
  } catch (error) {
    console.error('Session fetch error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
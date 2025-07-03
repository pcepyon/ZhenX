import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateSessionId } from '@/lib/utils/session'
import type { ApiResponse } from '@/lib/supabase/types'

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Validate session ID format
    if (!validateSessionId(params.sessionId)) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Invalid session ID format' 
        }, 
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const body = await request.json()
    
    // Validate required fields
    if (!body.step_number || !body.selected_concerns) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Missing required fields: step_number and selected_concerns' 
        }, 
        { status: 400 }
      )
    }
    
    // Verify session exists and is not expired
    const { data: session, error: sessionError } = await supabase
      .from('user_sessions')
      .select('session_id, expires_at')
      .eq('session_id', params.sessionId)
      .single()
    
    if (sessionError || !session) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Session not found' 
        }, 
        { status: 404 }
      )
    }
    
    // Check if session is expired
    const expiresAt = new Date(session.expires_at)
    if (expiresAt < new Date()) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Session expired' 
        }, 
        { status: 401 }
      )
    }
    
    // Delete existing input for this step (if any) to allow updates
    await supabase
      .from('user_inputs')
      .delete()
      .eq('session_id', params.sessionId)
      .eq('step_number', body.step_number)
    
    // Save new input
    const { error: insertError } = await supabase
      .from('user_inputs')
      .insert({
        session_id: params.sessionId,
        step_number: body.step_number,
        selected_concerns: body.selected_concerns
      })
    
    if (insertError) {
      console.error('Input save error:', insertError)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to save user input' 
        }, 
        { status: 500 }
      )
    }
    
    // Update last activity on session
    await supabase
      .from('user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('session_id', params.sessionId)
    
    return NextResponse.json<ApiResponse>({ 
      success: true,
      data: {
        session_id: params.sessionId,
        step_number: body.step_number,
        saved: true
      }
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json<ApiResponse>(
      { 
        success: false,
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Validate session ID format
    if (!validateSessionId(params.sessionId)) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Invalid session ID format' 
        }, 
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Get all inputs for this session
    const { data: inputs, error } = await supabase
      .from('user_inputs')
      .select('*')
      .eq('session_id', params.sessionId)
      .order('step_number')
    
    if (error) {
      console.error('Input fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to fetch user inputs' 
        }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        session_id: params.sessionId,
        inputs: inputs || []
      }
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json<ApiResponse>(
      { 
        success: false,
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}
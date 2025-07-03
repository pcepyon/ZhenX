import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get recent sessions
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      sessions: data?.map(session => ({
        session_id: session.session_id,
        created_at: session.created_at,
        expires_at: session.expires_at,
        ip_address: session.ip_address,
        language: session.language,
        country_code: session.country_code,
        user_agent: session.user_agent?.substring(0, 50) + '...'
      }))
    })
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
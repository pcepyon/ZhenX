import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateSessionId } from '@/lib/utils/session'
import { calculateSimpleRecommendations } from '@/lib/utils/recommendation'
import type { ApiResponse } from '@/lib/supabase/types'

export const maxDuration = 30 // 30 seconds limit for Vercel

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
    
    // 1. Verify session exists and is not expired
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
    
    // 2. Get user inputs
    const { data: userInputs, error: inputError } = await supabase
      .from('user_inputs')
      .select('*')
      .eq('session_id', params.sessionId)
      .order('step_number')
    
    if (inputError || !userInputs || userInputs.length === 0) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'No user inputs found. Please complete the wizard first.' 
        }, 
        { status: 400 }
      )
    }
    
    // 3. Get all active packages
    const { data: packages, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
    
    if (packageError || !packages) {
      console.error('Package fetch error:', packageError)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to fetch packages' 
        }, 
        { status: 500 }
      )
    }
    
    // 4. Calculate recommendations
    const recommendations = calculateSimpleRecommendations(packages, userInputs)
    
    if (recommendations.length === 0) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'No suitable packages found for your criteria' 
        }, 
        { status: 404 }
      )
    }
    
    // 5. Clear existing recommendations for this session
    await supabase
      .from('package_recommendations')
      .delete()
      .eq('session_id', params.sessionId)
    
    // 6. Save new recommendations
    const recommendationData = recommendations.map((rec, index) => ({
      session_id: params.sessionId,
      package_id: rec.package_id,
      match_score: rec.match_score,
      rank_order: index + 1
    }))
    
    const { error: saveError } = await supabase
      .from('package_recommendations')
      .insert(recommendationData)
    
    if (saveError) {
      console.error('Recommendation save error:', saveError)
      // Continue even if save fails - user can still see recommendations
    }
    
    // 7. Update session last activity
    await supabase
      .from('user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('session_id', params.sessionId)
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        session_id: params.sessionId,
        recommendations: recommendations.map(rec => ({
          package_id: rec.package_id,
          package_code: rec.package_code,
          package_name: rec.package_name,
          match_score: rec.match_score,
          reasoning: rec.reasoning,
          price_tier: rec.price_tier,
          final_price: rec.final_price
        })),
        total_count: recommendations.length
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
    
    // Get existing recommendations
    const { data: recommendations, error } = await supabase
      .from('package_recommendations')
      .select(`
        *,
        package:packages (
          id,
          package_code,
          name_ko,
          name_cn,
          price_tier,
          final_price,
          category_id,
          concern_tags
        )
      `)
      .eq('session_id', params.sessionId)
      .order('rank_order')
    
    if (error) {
      console.error('Recommendation fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to fetch recommendations' 
        }, 
        { status: 500 }
      )
    }
    
    if (!recommendations || recommendations.length === 0) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'No recommendations found. Please complete the wizard first.' 
        }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        session_id: params.sessionId,
        recommendations: recommendations.map(rec => ({
          package_id: rec.package.id,
          package_code: rec.package.package_code,
          package_name: rec.package.name_ko,
          match_score: rec.match_score,
          rank_order: rec.rank_order,
          price_tier: rec.package.price_tier,
          final_price: rec.package.final_price
        })),
        total_count: recommendations.length
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
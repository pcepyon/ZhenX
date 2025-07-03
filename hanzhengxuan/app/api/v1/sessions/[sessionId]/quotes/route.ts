import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateSessionId } from '@/lib/utils/session'
import { generateQuoteId, calculateTotal, convertToCNY } from '@/lib/utils/quote'
import type { ApiResponse } from '@/lib/supabase/types'

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Validate session ID
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
    if (!body.selected_packages || !Array.isArray(body.selected_packages) || body.selected_packages.length === 0) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'At least one package must be selected' 
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
    
    // 1. Fetch selected packages
    const { data: packages, error: pkgError } = await supabase
      .from('packages')
      .select('*')
      .in('package_code', body.selected_packages)
      .eq('is_active', true)
    
    if (pkgError || !packages || packages.length === 0) {
      console.error('Package fetch error:', pkgError)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Invalid or inactive packages selected' 
        }, 
        { status: 400 }
      )
    }
    
    // Verify all requested packages were found
    if (packages.length !== body.selected_packages.length) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Some packages were not found' 
        }, 
        { status: 400 }
      )
    }
    
    // 2. Generate unique quote ID
    const quoteId = await generateQuoteId()
    
    // 3. Calculate total price
    const totalPrice = calculateTotal(packages)
    
    // 4. Prepare quote data
    const quoteData = {
      quote_id: quoteId,
      session_id: params.sessionId,
      packages: packages.map(pkg => ({
        id: pkg.id,
        package_code: pkg.package_code,
        name_ko: pkg.name_ko,
        name_cn: pkg.name_cn,
        final_price: pkg.final_price,
        price_tier: pkg.price_tier,
        category_id: pkg.category_id
      })),
      personal_info: body.personal_info || {},
      total_price: totalPrice,
      currency: 'KRW',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    }
    
    // 5. Save quote to database
    const { data: quote, error: insertError } = await supabase
      .from('quotes')
      .insert(quoteData)
      .select()
      .single()
    
    if (insertError) {
      console.error('Quote save error:', insertError)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to create quote' 
        }, 
        { status: 500 }
      )
    }
    
    // 6. Update session last activity
    await supabase
      .from('user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('session_id', params.sessionId)
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        quote_id: quoteId,
        quote_url: `/quote/${quoteId}`,
        total_price: totalPrice,
        total_price_cny: convertToCNY(totalPrice),
        expires_at: quote.expires_at,
        created_at: quote.created_at,
        package_count: packages.length
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
    // Validate session ID
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
    
    // Get all quotes for this session
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('session_id', params.sessionId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Quote fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to fetch quotes' 
        }, 
        { status: 500 }
      )
    }
    
    // Format quotes for response
    const formattedQuotes = quotes?.map(quote => ({
      quote_id: quote.quote_id,
      quote_url: `/quote/${quote.quote_id}`,
      total_price: quote.total_price,
      total_price_cny: convertToCNY(quote.total_price),
      package_count: quote.packages?.length || 0,
      created_at: quote.created_at,
      expires_at: quote.expires_at,
      is_expired: new Date(quote.expires_at) < new Date()
    })) || []
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        session_id: params.sessionId,
        quotes: formattedQuotes,
        total_count: formattedQuotes.length
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
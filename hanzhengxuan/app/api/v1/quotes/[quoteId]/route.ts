import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { 
  isQuoteExpired, 
  getRemainingDays, 
  convertToCNY,
  getExchangeRate 
} from '@/lib/utils/quote'
import type { ApiResponse } from '@/lib/supabase/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quoteId: string }> }
) {
  try {
    const { quoteId } = await params
    
    // Basic validation
    if (!quoteId || !quoteId.startsWith('Q')) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Invalid quote ID format' 
        }, 
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Fetch quote
    const { data: quote, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('quote_id', quoteId)
      .single()
    
    if (error || !quote) {
      console.error('Quote fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Quote not found' 
        }, 
        { status: 404 }
      )
    }
    
    // Check if expired
    if (isQuoteExpired(quote.expires_at)) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Quote has expired',
          data: {
            expired_at: quote.expires_at
          }
        }, 
        { status: 410 } // Gone
      )
    }
    
    // Calculate price details
    const totalPriceKRW = quote.total_price
    const totalPriceCNY = convertToCNY(totalPriceKRW)
    const exchangeRate = getExchangeRate()
    
    // Format package details
    const packageDetails = quote.packages?.map((pkg: any) => ({
      package_code: pkg.package_code,
      name_ko: pkg.name_ko,
      name_cn: pkg.name_cn,
      category_id: pkg.category_id,
      price_tier: pkg.price_tier,
      final_price: pkg.final_price,
      final_price_krw: pkg.final_price,
      final_price_cny: convertToCNY(pkg.final_price)
    })) || []
    
    // Prepare response
    const response = {
      quote_id: quote.quote_id,
      created_at: quote.created_at,
      expires_at: quote.expires_at,
      remaining_days: getRemainingDays(quote.expires_at),
      packages: packageDetails,
      package_count: packageDetails.length,
      pricing: {
        total_price_krw: totalPriceKRW,
        total_price_cny: totalPriceCNY,
        currency: quote.currency || 'KRW',
        exchange_rate: exchangeRate
      },
      personal_info: quote.personal_info || {},
      share_url: `/quote/${quote.quote_id}`
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: response
    }, {
      headers: {
        // Cache for 1 hour since quotes don't change
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { quoteId: string } }
) {
  try {
    const quoteId = params.quoteId
    
    // Basic validation
    if (!quoteId || !quoteId.startsWith('Q')) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Invalid quote ID format' 
        }, 
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Soft delete by setting expires_at to now
    const { error } = await supabase
      .from('quotes')
      .update({ 
        expires_at: new Date().toISOString() 
      })
      .eq('quote_id', quoteId)
    
    if (error) {
      console.error('Quote delete error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false,
          error: 'Failed to delete quote' 
        }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        quote_id: quoteId,
        deleted: true
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
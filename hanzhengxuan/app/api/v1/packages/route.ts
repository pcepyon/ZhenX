import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApiResponse } from '@/lib/supabase/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const priceTier = searchParams.get('price_tier')
    
    const supabase = await createClient()
    
    // Build query
    let query = supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      
    // Apply filters if provided
    if (category) {
      query = query.eq('category_id', category)
    }
    
    if (priceTier) {
      query = query.eq('price_tier', priceTier)
    }
    
    const { data: packages, error } = await query.order('final_price')
    
    if (error) {
      console.error('Package fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Failed to fetch packages' 
        }, 
        { status: 500 }
      )
    }
    
    // Add price formatting
    const formattedPackages = packages?.map(pkg => {
      const originalPrice = Math.round(pkg.final_price / (1 - pkg.discount_rate))
      const discountAmount = originalPrice - pkg.final_price
      
      return {
        ...pkg,
        price_display: {
          original_krw: originalPrice,
          discounted_krw: pkg.final_price,
          discount_percent: Math.round(pkg.discount_rate * 100),
          // Approximate CNY conversion (1 KRW = 0.0054 CNY)
          original_cny: Math.round(originalPrice * 0.0054),
          discounted_cny: Math.round(pkg.final_price * 0.0054)
        }
      }
    })
    
    return NextResponse.json<ApiResponse>(
      { 
        success: true,
        data: { 
          packages: formattedPackages || [],
          filters: {
            category,
            price_tier: priceTier
          }
        }
      },
      { 
        headers: { 
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800' 
        } 
      }
    )
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
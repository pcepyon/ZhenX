import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApiResponse } from '@/lib/supabase/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code: packageCode } = await params
    
    if (!packageCode) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Package code is required' 
        }, 
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Get package details by package_code
    const { data: packageData, error } = await supabase
      .from('packages')
      .select('*')
      .eq('package_code', packageCode)
      .eq('is_active', true)
      .single()
      
    if (error || !packageData) {
      console.error('Package fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Package not found' 
        }, 
        { status: 404 }
      )
    }
    
    // Calculate price breakdown
    const finalPrice = packageData.final_price
    const discountRate = packageData.discount_rate || 0.1
    const originalPrice = Math.round(finalPrice / (1 - discountRate))
    const discountAmount = originalPrice - finalPrice
    const discountPercent = Math.round(discountRate * 100)
    
    // Fixed exchange rate (1 CNY = 190 KRW)
    const exchangeRate = 190
    
    const priceBreakdown = {
      original_price_krw: originalPrice,
      discount_amount_krw: discountAmount,
      discount_percent: discountPercent,
      final_price_krw: finalPrice,
      original_price_cny: Math.round(originalPrice / exchangeRate),
      discount_amount_cny: Math.round(discountAmount / exchangeRate),
      final_price_cny: Math.round(finalPrice / exchangeRate),
      exchange_rate: exchangeRate
    }
    
    // Format the response
    const formattedPackage = {
      ...packageData,
      price_breakdown: priceBreakdown
    }
    
    return NextResponse.json<ApiResponse>(
      { 
        success: true,
        data: { 
          package: formattedPackage
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
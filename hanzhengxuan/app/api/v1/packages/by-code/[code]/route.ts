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
    
    // Get package details with package items, treatments, and hospital info
    const { data: packageData, error } = await supabase
      .from('packages')
      .select(`
        *,
        hospital_id,
        package_items (
          *,
          treatment:treatments_base (
            *
          )
        )
      `)
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
    
    // Get treatment info for all treatments in the package
    const treatmentCodes = packageData.package_items?.map((item: any) => 
      item.treatment?.code
    ).filter(Boolean) || []
    
    let treatmentInfos: any[] = []
    if (treatmentCodes.length > 0) {
      const { data: infos } = await supabase
        .from('treatment_info')
        .select('*')
        .in('treatment_code', treatmentCodes)
      
      treatmentInfos = infos || []
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
    
    // Enrich package items with treatment info
    const enrichedPackageItems = packageData.package_items?.map((item: any) => ({
      ...item,
      treatment_info: treatmentInfos.find(info => 
        info.treatment_code === item.treatment?.code
      )
    })) || []
    
    // Format the response
    const formattedPackage = {
      ...packageData,
      package_items: enrichedPackageItems,
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
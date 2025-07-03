import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ApiResponse, Category } from '@/lib/supabase/types'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
      
    if (error) {
      console.error('Category fetch error:', error)
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Failed to fetch categories' 
        }, 
        { status: 500 }
      )
    }
    
    // Return with cache headers for performance
    return NextResponse.json<ApiResponse<{ categories: Category[] }>>(
      { 
        success: true,
        data: { categories: categories || [] }
      },
      { 
        headers: { 
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' 
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
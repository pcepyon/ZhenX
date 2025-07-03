import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse } from '@/lib/supabase/types';

interface Concern {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  weight: number;
  created_at: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const supabase = await createClient();
    const { categoryId } = params;
    
    const { data: concerns, error } = await supabase
      .from('concerns')
      .select('*')
      .eq('category_id', categoryId)
      .order('display_order', { ascending: true });
      
    if (error) {
      console.error('Concerns fetch error:', error);
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Failed to fetch concerns' 
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json<ApiResponse<{ concerns: Concern[] }>>(
      { 
        success: true,
        data: { concerns: concerns || [] }
      },
      { 
        headers: { 
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' 
        } 
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}
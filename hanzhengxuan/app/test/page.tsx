import { createClient } from '@/lib/supabase/server'
import type { Category } from '@/lib/supabase/types'

export default async function TestPage() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Supabase 연결 오류</h1>
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase 연결 테스트</h1>
      
      <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
        <p className="text-green-800 font-semibold">✅ Supabase 연결 성공!</p>
      </div>
      
      <h2 className="text-xl font-semibold mb-3">카테고리 데이터 ({data?.length || 0}개)</h2>
      
      <div className="grid gap-4">
        {data?.map((category: Category) => (
          <div key={category.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              <span className="text-gray-400 text-sm">순서: {category.display_order}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Raw Data:</h3>
        <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
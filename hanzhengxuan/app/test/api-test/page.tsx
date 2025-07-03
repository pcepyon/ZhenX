'use client'

import { useState } from 'react'
import { useCategories } from '@/hooks/api/useCategories'
import { usePackages } from '@/hooks/api/usePackages'
import { useCreateRecommendations } from '@/hooks/api/useRecommendations'
import { useCreateQuote } from '@/hooks/api/useQuote'
import { useSaveWizardInput } from '@/hooks/api/useWizardInputs'
import { useSession } from '@/hooks/useSession'
import { Button, Card } from '@/components/ui'

export default function ApiTest() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const { sessionId, isLoading: sessionLoading, error: sessionError } = useSession()
  
  // API Hooks
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories()
  const { data: packages, isLoading: packagesLoading, error: packagesError } = usePackages({ 
    categoryId: selectedCategory || undefined 
  })
  const { mutate: createRecommendations, isPending: recommendationsLoading } = useCreateRecommendations()
  const { mutate: createQuote, isPending: quoteLoading } = useCreateQuote()
  const { mutate: saveInput, isPending: saveInputLoading } = useSaveWizardInput()

  const handleTestRecommendations = () => {
    // First save some test inputs
    saveInput({
      step_number: 1,
      selected_categories: ['elasticity', 'whitening'],
    }, {
      onSuccess: () => {
        saveInput({
          step_number: 2,
          selected_concerns: ['sagging_skin', 'large_pores', 'spots'],
        }, {
          onSuccess: () => {
            saveInput({
              step_number: 3,
              personal_factors: ['skin_sensitivity', 'first_time'],
            }, {
              onSuccess: () => {
                // Then create recommendations
                createRecommendations()
              }
            })
          }
        })
      }
    })
  }

  const handleTestQuote = () => {
    createQuote({
      selected_packages: ['ELASTICITY_BASIC', 'WHITENING_PREMIUM']
    })
  }

  return (
    <div className="container min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-8">API 测试页面</h1>
      
      {/* Session Info */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">会话信息</h2>
        {sessionLoading && <p>加载中...</p>}
        {sessionError && <p className="text-red-500">错误: {sessionError}</p>}
        {sessionId && (
          <div>
            <p>Session ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{sessionId}</code></p>
          </div>
        )}
      </Card>

      {/* Categories Test */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">分类列表</h2>
        {categoriesLoading && <p>加载中...</p>}
        {categoriesError && <p className="text-red-500">错误: {categoriesError.message}</p>}
        {categories && (
          <div className="space-y-2">
            <p className="mb-3">共 {categories.length} 个分类</p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.id ? 'border-primary-mint bg-primary-mint-light' : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-gray-600">{category.concern_count} 个问题</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Packages Test */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          套餐列表
          {selectedCategory && <span className="text-sm font-normal ml-2">（筛选: {selectedCategory}）</span>}
        </h2>
        {packagesLoading && <p>加载中...</p>}
        {packagesError && <p className="text-red-500">错误: {packagesError.message}</p>}
        {packages && (
          <div className="space-y-2">
            <p className="mb-3">共 {packages.length} 个套餐</p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {packages.map((pkg) => (
                <div key={pkg.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{pkg.name}</p>
                      <p className="text-sm text-gray-600">
                        {pkg.package_code} | {pkg.price_tier} | ₩{pkg.final_price.toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      pkg.price_tier === 'basic' ? 'bg-tier-basic/20 text-tier-basic' :
                      pkg.price_tier === 'premium' ? 'bg-tier-premium/20 text-tier-premium' :
                      pkg.price_tier === 'luxury' ? 'bg-tier-luxury/20 text-tier-luxury' :
                      'bg-tier-ultra/20 text-tier-ultra'
                    }`}>
                      {pkg.price_tier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* API Actions */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">API 操作测试</h2>
        <div className="space-y-3">
          <div>
            <Button 
              onClick={handleTestRecommendations}
              loading={saveInputLoading || recommendationsLoading}
              disabled={!sessionId}
            >
              测试推荐算法
            </Button>
            <p className="text-sm text-gray-600 mt-1">
              保存测试输入并生成推荐
            </p>
          </div>
          
          <div>
            <Button 
              onClick={handleTestQuote}
              loading={quoteLoading}
              disabled={!sessionId}
              variant="secondary"
            >
              创建报价单
            </Button>
            <p className="text-sm text-gray-600 mt-1">
              使用测试数据创建报价
            </p>
          </div>
        </div>
      </Card>

      {/* Network Activity Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>提示：打开浏览器开发者工具查看网络请求详情</p>
        <p>React Query DevTools 可在开发环境中使用（右下角）</p>
      </div>
    </div>
  )
}
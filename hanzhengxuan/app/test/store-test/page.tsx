'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useSession } from '@/hooks/useSession'
import { Button, Card } from '@/components/ui'

const mockCategories = [
  { id: 'elasticity', name: '弹性提升' },
  { id: 'whitening', name: '美白祛斑' },
  { id: 'wrinkle', name: '抗皱紧致' },
  { id: 'acne', name: '痘痘痘印' },
  { id: 'contour', name: '轮廓塑形' }
]

const mockConcerns = [
  { id: 'c1', categoryId: 'elasticity', name: '皮肤松弛', severity: 3 },
  { id: 'c2', categoryId: 'elasticity', name: '毛孔粗大', severity: 2 },
  { id: 'c3', categoryId: 'whitening', name: '色斑', severity: 3 },
  { id: 'c4', categoryId: 'whitening', name: '肤色暗沉', severity: 2 }
]

export default function StoreTest() {
  const { 
    sessionId,
    selectedCategories, 
    selectedConcerns,
    personalFactors,
    interestedPackages,
    addCategory, 
    removeCategory,
    toggleConcern,
    togglePersonalFactor,
    addInterest,
    removeInterest,
    resetWizard,
    resetAll
  } = useAppStore()
  
  const { initSession, isLoading, error } = useSession()
  
  useEffect(() => {
    if (!sessionId) {
      initSession()
    }
  }, [sessionId])

  return (
    <div className="container min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-8">Zustand Store 测试</h1>
      
      {/* Session Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">会话管理</h2>
        <div className="space-y-2">
          <p>Session ID: <code className="bg-gray-100 px-2 py-1 rounded">{sessionId || '未初始化'}</code></p>
          <p>状态: {isLoading ? '加载中...' : sessionId ? '已连接' : '未连接'}</p>
          {error && <p className="text-red-500">错误: {error}</p>}
          <Button onClick={initSession} disabled={isLoading} size="sm">
            重新初始化会话
          </Button>
        </div>
      </Card>

      {/* Categories Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">分类选择 (最多3个)</h2>
        <p className="mb-3">已选择: {selectedCategories.join(', ') || '无'}</p>
        <div className="flex flex-wrap gap-2">
          {mockCategories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategories.includes(cat.id) ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                if (selectedCategories.includes(cat.id)) {
                  removeCategory(cat.id)
                } else {
                  addCategory(cat.id)
                }
              }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Concerns Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">具体问题</h2>
        <p className="mb-3">已选择 {selectedConcerns.length} 个问题</p>
        <div className="space-y-2">
          {mockConcerns.map(concern => (
            <label key={concern.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedConcerns.some(c => c.id === concern.id)}
                onChange={() => toggleConcern(concern)}
                className="w-4 h-4"
              />
              <span>{concern.name} (分类: {concern.categoryId})</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Personal Factors Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">个人因素</h2>
        <div className="grid grid-cols-2 gap-3">
          {personalFactors.map(factor => (
            <label key={factor.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={factor.checked}
                onChange={() => togglePersonalFactor(factor.id)}
                className="w-4 h-4"
              />
              <span>{factor.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Interested Packages Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">感兴趣的套餐</h2>
        <p className="mb-3">已收藏: {interestedPackages.join(', ') || '无'}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => addInterest('ELASTICITY_BASIC')}
          >
            添加 ELASTICITY_BASIC
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => addInterest('WHITENING_PREMIUM')}
          >
            添加 WHITENING_PREMIUM
          </Button>
          {interestedPackages.length > 0 && (
            <Button
              size="sm"
              variant="text"
              onClick={() => removeInterest(interestedPackages[0])}
            >
              移除第一个
            </Button>
          )}
        </div>
      </Card>

      {/* Actions Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">操作</h2>
        <div className="flex gap-3">
          <Button onClick={resetWizard} variant="secondary">
            重置向导数据
          </Button>
          <Button onClick={resetAll} variant="text">
            重置所有数据
          </Button>
          <Button 
            onClick={() => {
              const state = useAppStore.getState()
              console.log('Current State:', state)
              alert('状态已打印到控制台')
            }}
          >
            查看当前状态
          </Button>
        </div>
      </Card>

      {/* LocalStorage Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>提示：只有 sessionId 和 interestedPackages 会被持久化到 localStorage</p>
        <p>刷新页面后，这两个字段会被恢复，其他数据会重置</p>
      </div>
    </div>
  )
}
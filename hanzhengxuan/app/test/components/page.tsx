'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  Modal,
  BottomSheet,
  ProgressDots,
  ProgressBar,
  Checkbox,
  Radio,
  Slider
} from '@/components/ui'

export default function ComponentTest() {
  const [modalOpen, setModalOpen] = useState(false)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [progress, setProgress] = useState(1)
  const [sliderValue, setSliderValue] = useState(50)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')

  return (
    <div className="container min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-8">组件系统测试</h1>

      {/* Button Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">按钮 Button</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg">主要按钮 Large</Button>
            <Button variant="primary" size="md">主要按钮 Medium</Button>
            <Button variant="primary" size="sm">主要按钮 Small</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="lg">次要按钮</Button>
            <Button variant="secondary" size="md">次要按钮</Button>
            <Button variant="secondary" size="sm">次要按钮</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="text" size="lg">文字按钮</Button>
            <Button variant="text" size="md">文字按钮</Button>
            <Button variant="text" size="sm">文字按钮</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button loading>加载中...</Button>
            <Button disabled>禁用状态</Button>
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">卡片 Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-semibold mb-2">基础卡片</h3>
            <p className="text-gray-600">这是一个基础卡片，没有交互效果。</p>
          </Card>
          <Card hoverable>
            <h3 className="font-semibold mb-2">悬停效果卡片</h3>
            <p className="text-gray-600">鼠标悬停时会有阴影效果。</p>
          </Card>
          <Card
            hoverable
            selected={selectedCard === 1}
            onClick={() => setSelectedCard(selectedCard === 1 ? null : 1)}
          >
            <h3 className="font-semibold mb-2">可选择卡片 1</h3>
            <p className="text-gray-600">点击选择这个卡片。</p>
          </Card>
          <Card
            hoverable
            selected={selectedCard === 2}
            onClick={() => setSelectedCard(selectedCard === 2 ? null : 2)}
          >
            <h3 className="font-semibold mb-2">可选择卡片 2</h3>
            <p className="text-gray-600">点击选择这个卡片。</p>
          </Card>
        </div>
      </section>

      {/* Modal Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">模态框 Modal</h2>
        <div className="flex gap-3">
          <Button onClick={() => setModalOpen(true)}>打开居中模态框</Button>
          <Button variant="secondary" onClick={() => setBottomSheetOpen(true)}>
            打开底部抽屉
          </Button>
        </div>
      </section>

      {/* Progress Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">进度指示器 Progress</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">进度点 ProgressDots</h3>
            <ProgressDots total={3} current={progress} />
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 1))}>
                上一步
              </Button>
              <Button size="sm" onClick={() => setProgress(Math.min(3, progress + 1))}>
                下一步
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">进度条 ProgressBar</h3>
            <ProgressBar value={sliderValue} showLabel />
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">输入组件 Input</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">复选框 Checkbox</h3>
            <Checkbox
              label="同意服务条款"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
          </div>
          <div>
            <h3 className="font-medium mb-3">单选按钮 Radio</h3>
            <div className="space-y-2">
              <Radio
                label="选项 1"
                name="radio-group"
                value="option1"
                checked={radioValue === 'option1'}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <Radio
                label="选项 2"
                name="radio-group"
                value="option2"
                checked={radioValue === 'option2'}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <Radio
                label="选项 3"
                name="radio-group"
                value="option3"
                checked={radioValue === 'option3'}
                onChange={(e) => setRadioValue(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">滑块 Slider</h3>
            <Slider
              label="选择数值"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              min={0}
              max={100}
            />
          </div>
        </div>
      </section>

      {/* Modal Component */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} position="center">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">居中模态框</h2>
          <p className="text-gray-600 mb-6">
            这是一个居中显示的模态框。可以点击背景或关闭按钮来关闭。
          </p>
          <div className="flex gap-3">
            <Button onClick={() => setModalOpen(false)}>确定</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* BottomSheet Component */}
      <BottomSheet open={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)}>
        <div className="py-4">
          <h2 className="text-2xl font-semibold mb-4">底部抽屉</h2>
          <p className="text-gray-600 mb-6">
            这是一个从底部弹出的抽屉。可以通过向下拖动来关闭。
          </p>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full">
              选项 1
            </Button>
            <Button variant="secondary" className="w-full">
              选项 2
            </Button>
            <Button variant="secondary" className="w-full">
              选项 3
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
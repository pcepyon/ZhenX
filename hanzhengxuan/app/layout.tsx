import type { Metadata } from 'next'
import { Noto_Sans_KR, Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from './providers'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-sans-kr',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = {
  title: '韩真选 - 韩国医美之旅',
  description: '为中国访客精选韩国医美套餐服务，专业可靠的医美旅游一站式解决方案',
  keywords: '韩国医美,医美旅游,整形美容,韩真选,医美套餐',
  authors: [{ name: '韩真选' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: '韩真选 - 韩国医美之旅',
    description: '为中国访客精选韩国医美套餐服务',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${notoSansKR.variable} ${notoSansSC.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
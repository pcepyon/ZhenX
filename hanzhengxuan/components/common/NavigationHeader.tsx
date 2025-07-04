'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAppStore } from '@/store/useAppStore';

interface NavigationHeaderProps {
  hideOnPaths?: string[];
}

export function NavigationHeader({ hideOnPaths = ['/', '/loading', '/quote/success'] }: NavigationHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const { resetWizard } = useAppStore();

  // Hide header on specified paths
  if (hideOnPaths.includes(pathname)) {
    return null;
  }
  
  // Hide on dynamic quote pages (e.g., /quote/Q24110812345)
  if (pathname.match(/^\/quote\/Q\d+$/)) {
    return null;
  }

  // Get progress text based on current path
  const getProgressText = () => {
    if (pathname.includes('/wizard/step1')) return '단계 1/3';
    if (pathname.includes('/wizard/step2')) return '단계 2/3';
    if (pathname.includes('/wizard/step3')) return '단계 3/3';
    if (pathname.includes('/loading')) return 'AI 분석 중';
    if (pathname.includes('/recommendations')) return '추천 패키지';
    if (pathname.includes('/interests')) return '관심 패키지';
    if (pathname.includes('/quote/create')) return '견적서 작성';
    if (pathname.includes('/quote/success')) return '견적 완료';
    if (pathname.includes('/quote/')) return '견적서';
    return '';
  };

  // Handle back navigation
  const handleBack = () => {
    // Custom back logic for specific pages
    if (pathname === '/wizard/step1') {
      router.push('/');
    } else if (pathname === '/recommendations') {
      router.push('/wizard/step3');
    } else {
      router.back();
    }
  };

  // Handle home navigation
  const handleHome = () => {
    setShowHomeConfirm(true);
  };

  const confirmHome = () => {
    resetWizard();
    router.push('/');
    setShowHomeConfirm(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between h-full px-4 max-w-[420px] mx-auto">
          {/* Left: Navigation buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-10 w-10"
              aria-label="뒤로가기"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 18L9 12L15 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleHome}
              className="h-10 w-10"
              aria-label="홈으로"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 22V12H15V22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          {/* Center: Logo */}
          <span className="font-medium text-base">한진선</span>

          {/* Right: Progress */}
          <span className="text-sm text-gray-500 min-w-[60px] text-right">
            {getProgressText()}
          </span>
        </div>
      </header>

      {/* Padding to account for fixed header */}
      <div className="h-14" />

      {/* Home confirmation modal */}
      <Modal open={showHomeConfirm} onClose={() => setShowHomeConfirm(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            처음으로 돌아가시겠습니까?
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            진행 중인 선택 내용이 모두 초기화됩니다.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHomeConfirm(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={confirmHome}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
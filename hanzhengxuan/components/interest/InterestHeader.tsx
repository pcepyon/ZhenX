'use client';

import { useState } from 'react';

interface InterestHeaderProps {
  totalCount: number;
  selectedCount: number;
  isSelectMode: boolean;
  onToggleSelectMode: () => void;
  onClearAll: () => void;
}

export function InterestHeader({
  totalCount,
  selectedCount,
  isSelectMode,
  onToggleSelectMode,
  onClearAll
}: InterestHeaderProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const handleClearAll = () => {
    if (showClearConfirm) {
      onClearAll();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      // Auto-hide confirm after 3 seconds
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 z-40">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              관심 패키지
              {totalCount > 0 && (
                <span className="ml-2 text-primary-mint">
                  {totalCount}
                </span>
              )}
            </h1>
            {isSelectMode && selectedCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedCount}개 선택됨
              </p>
            )}
          </div>
          
          {totalCount > 0 && (
            <div className="flex items-center gap-2">
              {/* Select mode toggle */}
              <button
                onClick={onToggleSelectMode}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isSelectMode 
                    ? 'bg-primary-mint text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isSelectMode ? '선택 완료' : '선택'}
              </button>
              
              {/* Clear all button */}
              {!showClearConfirm ? (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  전체 삭제
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-red-50 rounded-lg px-2 py-1">
                  <span className="text-xs text-red-600">정말 삭제?</span>
                  <button
                    onClick={handleClearAll}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareActionsProps {
  quoteId: string;
  onShare: (method: 'copy' | 'wechat' | 'kakao' | 'qr') => void;
  className?: string;
}

export function ShareActions({ quoteId, onShare, className }: ShareActionsProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    onShare('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareOptions = [
    {
      id: 'wechat',
      name: '微信',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.006-.27-.017-.405-.017zm-2.692 3.311c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
        </svg>
      ),
      color: 'text-green-600 hover:bg-green-50'
    },
    {
      id: 'kakao',
      name: '카카오톡',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.208-12 9.747 0 3.148 1.784 5.971 4.472 7.79.092.875-.061 1.49-.288 2.233a1 1 0 0 0 1.61 1.113c2.165-1.58 3.332-2.248 4.51-2.414.613.052 1.234.08 1.696.08 6.627 0 12-4.208 12-9.802S18.627 1 12 1z"/>
        </svg>
      ),
      color: 'text-yellow-600 hover:bg-yellow-50'
    },
    {
      id: 'qr',
      name: 'QR 코드',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
          <rect x="5" y="5" width="3" height="3"/>
          <rect x="16" y="5" width="3" height="3"/>
          <rect x="5" y="16" width="3" height="3"/>
          <path d="M14 14h1v1h-1zM15 15h1v1h-1zM16 14h1v1h-1zM17 15h1v1h-1zM18 14h1v1h-1zM19 15h1v1h-1zM20 14h1v1h-1zM14 16h1v1h-1zM16 16h1v1h-1zM18 16h1v1h-1zM20 16h1v1h-1zM14 18h1v1h-1zM15 19h1v1h-1zM16 18h1v1h-1zM17 19h1v1h-1zM18 18h1v1h-1zM19 19h1v1h-1zM20 18h1v1h-1zM14 20h1v1h-1zM16 20h1v1h-1zM18 20h1v1h-1zM20 20h1v1h-1z" strokeWidth="0" fill="currentColor"/>
        </svg>
      ),
      color: 'text-gray-600 hover:bg-gray-50'
    }
  ];
  
  return (
    <div className={cn("space-y-4", className)}>
      {/* Copy link button */}
      <button
        onClick={handleCopy}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200",
          copied 
            ? "border-green-500 bg-green-50 text-green-700" 
            : "border-gray-300 hover:border-primary-mint hover:bg-primary-mint-light"
        )}
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">링크가 복사되었어요!</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="font-medium">견적서 링크 복사</span>
          </>
        )}
      </button>
      
      {/* Share button */}
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-mint text-white rounded-lg hover:bg-primary-mint-dark transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="font-medium">친구에게 공유하기</span>
      </button>
      
      {/* Share options */}
      {showShareOptions && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
          <p className="text-sm text-gray-600 mb-3">공유 방법 선택</p>
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onShare(option.id as any);
                  setShowShareOptions(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={cn("p-2 rounded-full", option.color)}>
                  {option.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function QuoteNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        {/* Error message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          견적서를 찾을 수 없어요
        </h1>
        
        <div className="space-y-2 text-gray-600 mb-8">
          <p>요청하신 견적서가 존재하지 않거나</p>
          <p>유효기간이 만료되었어요</p>
        </div>
        
        {/* Info box */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-700">
            견적서는 발급일로부터 7일간 유효해요.<br />
            만료된 견적서는 다시 생성해주세요.
          </p>
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
            >
              새 견적서 만들기
            </Button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full px-4 py-3 text-gray-700 hover:text-primary-mint transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
        
        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            도움이 필요하신가요?
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a 
              href="tel:1588-0000" 
              className="text-primary-mint hover:text-primary-mint-dark"
            >
              전화 상담
            </a>
            <a 
              href="https://pf.kakao.com/_hanzhengxuan" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-mint hover:text-primary-mint-dark"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
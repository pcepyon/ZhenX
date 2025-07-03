import { cn } from '@/lib/utils';

interface QuoteHeaderProps {
  quoteId: string;
  createdAt: string;
  expiresAt: string;
  className?: string;
}

export function QuoteHeader({ 
  quoteId, 
  createdAt, 
  expiresAt, 
  className 
}: QuoteHeaderProps) {
  const createdDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const expiresDate = new Date(expiresAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const daysUntilExpiry = Math.ceil(
    (new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isExpired = daysUntilExpiry < 0;
  
  return (
    <header className={cn("bg-white border-b border-gray-200", className)}>
      <div className="max-w-4xl mx-auto px-5 py-6">
        <div className="flex items-start justify-between">
          {/* Logo and company info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary-mint rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">韩</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">韩真选</h1>
                <p className="text-sm text-gray-600">HanJinSeon Medical Beauty</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              한국 의료미용 토탈 솔루션
            </p>
          </div>
          
          {/* Quote info */}
          <div className="text-right">
            <div className="mb-2">
              <p className="text-xs text-gray-500">견적번호</p>
              <p className="text-lg font-bold text-gray-900">{quoteId}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-600">{createdDate} 발행</p>
              {isExpired ? (
                <p className="text-red-600 font-medium">견적서 만료됨</p>
              ) : (
                <p className={cn(
                  "font-medium",
                  daysUntilExpiry <= 2 ? "text-orange-600" : "text-gray-600"
                )}>
                  {expiresDate}까지 유효
                  {daysUntilExpiry <= 2 && ` (${daysUntilExpiry}일 남음)`}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Print only - watermark for expired quotes */}
        {isExpired && (
          <div className="hidden print:block absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-red-500 text-6xl font-bold opacity-20 rotate-[-30deg]">
              만료됨
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
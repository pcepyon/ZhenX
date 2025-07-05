'use client';

interface PriceTimeBarProps {
  packagePrice: number;
  originalPrice: number;
  totalDuration: number;
}

export function PriceTimeBar({ packagePrice, originalPrice, totalDuration }: PriceTimeBarProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
    }
    return `${mins}분`;
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        {/* Price section */}
        <div>
          <p className="text-xs text-gray-500 mb-1">패키지 특가</p>
          <p className="text-xl font-bold text-emerald-600">
            ₩{packagePrice.toLocaleString('ko-KR')}
          </p>
          <p className="text-sm text-gray-500 line-through">
            정가 ₩{originalPrice.toLocaleString('ko-KR')}
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-px h-12 bg-gray-200" />
        
        {/* Duration section */}
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">총 소요시간</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatDuration(totalDuration)}
          </p>
        </div>
      </div>
    </div>
  );
}
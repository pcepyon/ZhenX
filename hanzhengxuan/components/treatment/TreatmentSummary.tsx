'use client';

interface MetricCard {
  label: string;
  value: string;
  icon: string;
}

interface TreatmentSummaryProps {
  duration: number;
  recoveryDays: number;
  basePrice: number;
  effectDuration?: string;
}

export function TreatmentSummary({ 
  duration, 
  recoveryDays, 
  basePrice,
  effectDuration = '3-6개월'
}: TreatmentSummaryProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };
  
  const metrics: MetricCard[] = [
    { 
      label: '시술시간', 
      value: `${duration}분`,
      icon: '⏱️'
    },
    { 
      label: '회복기간', 
      value: recoveryDays === 0 ? '당일 가능' : `${recoveryDays}일`,
      icon: '🏃'
    },
    { 
      label: '정가', 
      value: `₩${formatPrice(basePrice)}`,
      icon: '💰'
    },
    { 
      label: '효과', 
      value: effectDuration,
      icon: '✨'
    }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="bg-gray-50 rounded-lg p-4 text-center"
        >
          <div className="text-2xl mb-2">{metric.icon}</div>
          <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
          <div className="text-sm font-semibold text-gray-900">{metric.value}</div>
        </div>
      ))}
    </div>
  );
}
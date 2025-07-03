'use client';

interface Treatment {
  code: string;
  name: string;
  duration: number;
  quantity?: number;
}

interface TreatmentTimelineProps {
  treatments: Treatment[];
  onTreatmentClick?: (treatmentCode: string) => void;
}

export function TreatmentTimeline({ 
  treatments, 
  onTreatmentClick 
}: TreatmentTimelineProps) {
  // Calculate cumulative time
  const timelineItems = treatments.map((treatment, index) => {
    const previousDuration = treatments
      .slice(0, index)
      .reduce((sum, t) => sum + (t.duration * (t.quantity || 1)), 0);
    
    return {
      ...treatment,
      startTime: previousDuration,
      endTime: previousDuration + (treatment.duration * (treatment.quantity || 1))
    };
  });
  
  const totalDuration = timelineItems[timelineItems.length - 1]?.endTime || 0;
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
    }
    return `${mins}분`;
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">시술 구성</h4>
        <span className="text-sm text-gray-600">
          총 소요시간: {totalHours > 0 ? `${totalHours}시간 ` : ''}{totalMinutes > 0 ? `${totalMinutes}분` : ''}
        </span>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200" />
        
        {/* Timeline items */}
        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            <div key={`${item.code}-${index}`} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-mint text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-4">
                <button
                  onClick={() => onTreatmentClick?.(item.code)}
                  className="text-left w-full group"
                  disabled={!onTreatmentClick}
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 group-hover:text-primary-mint transition-colors">
                          {item.name}
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-sm text-gray-500 ml-1">x{item.quantity}</span>
                          )}
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatTime(item.duration * (item.quantity || 1))}
                        </p>
                      </div>
                      {onTreatmentClick && (
                        <svg 
                          className="w-4 h-4 text-gray-400 mt-0.5"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
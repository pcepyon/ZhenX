'use client';

interface Doctor {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  imageUrl?: string;
}

interface DoctorInfoProps {
  doctors?: Doctor[];
}

export function DoctorInfo({ doctors }: DoctorInfoProps) {
  // Default doctor info if not provided
  const defaultDoctors: Doctor[] = [
    {
      name: '김성훈 원장',
      title: '피부과 전문의',
      specialty: '리프팅·탄력',
      experience: '15년 경력',
    }
  ];
  
  const displayDoctors = doctors && doctors.length > 0 ? doctors : defaultDoctors;
  
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">담당 의료진</h4>
      
      <div className="space-y-3">
        {displayDoctors.map((doctor, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 bg-gray-50 rounded-lg p-3"
          >
            {/* Doctor avatar */}
            <div className="flex-shrink-0">
              {doctor.imageUrl ? (
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-primary-mint rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {doctor.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Doctor info */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <h5 className="font-medium text-gray-900">{doctor.name}</h5>
                <span className="text-xs text-gray-500">{doctor.title}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-600">{doctor.specialty}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">{doctor.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <span className="font-medium">안심하세요!</span> 모든 의료진은 전문의 자격을 보유하고 있으며, 
          중국어 통역 서비스가 제공됩니다.
        </p>
      </div>
    </div>
  );
}
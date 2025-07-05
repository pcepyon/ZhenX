'use client';

interface PackageStorySectionProps {
  packageCode: string;
  name: string;
  tagline?: string;
  story?: string;
  keyBenefits?: string[];
  changeLevel?: number;
  changeLevelText?: string;
}

export function PackageStorySection({ 
  packageCode,
  name, 
  tagline, 
  story, 
  keyBenefits = [], 
  changeLevel = 3,
  changeLevelText = "눈에 띄는 변화"
}: PackageStorySectionProps) {
  // Star rating component
  const StarRating = ({ level }: { level: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= level ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{name}</h1>
      
      {tagline && (
        <p className="text-lg font-medium text-gray-800 mb-4">
          "{tagline}"
        </p>
      )}
      
      {story && (
        <p className="text-base text-gray-700 leading-relaxed mb-6">
          {story}
        </p>
      )}
      
      {keyBenefits.length > 0 && (
        <div className="space-y-2 mb-6">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">예상 변화:</span>
        <StarRating level={changeLevel} />
        <span className="text-sm text-gray-700">({changeLevelText})</span>
      </div>
    </div>
  );
}
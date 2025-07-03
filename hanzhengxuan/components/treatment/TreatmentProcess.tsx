'use client';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface TreatmentProcessProps {
  steps: ProcessStep[];
}

export function TreatmentProcess({ steps }: TreatmentProcessProps) {
  if (steps.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 mb-4">시술 과정</h4>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-8 bottom-2 w-px bg-gray-200" />
        
        {/* Process steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {/* Step number */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-10 h-10 bg-white border-2 border-primary-mint rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-mint">
                    {step.step}
                  </span>
                </div>
              </div>
              
              {/* Step content */}
              <div className="flex-1 pb-4">
                <div className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{step.title}</h5>
                    <span className="text-xs text-gray-500">{step.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
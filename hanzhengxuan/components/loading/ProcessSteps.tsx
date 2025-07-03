'use client';

interface ProcessStep {
  id: number;
  text: string;
  duration: number;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  currentStep: number;
}

export function ProcessSteps({ steps, currentStep }: ProcessStepsProps) {
  return (
    <div className="space-y-4 mb-8">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center gap-3 transition-all duration-300 ${
            index <= currentStep ? 'opacity-100' : 'opacity-40'
          }`}
        >
          {/* Step indicator */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              index < currentStep
                ? 'bg-primary-mint'
                : index === currentStep
                ? 'bg-primary-mint animate-pulse'
                : 'bg-gray-300'
            }`}
          >
            {index < currentStep ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          
          {/* Step text */}
          <span
            className={`text-sm font-medium ${
              index <= currentStep ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {step.text}
          </span>
        </div>
      ))}
    </div>
  );
}
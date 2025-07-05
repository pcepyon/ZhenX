'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProcessStep {
  id: number;
  text: string;
  duration: number;
  icon?: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  currentStep: number;
}

export function ProcessSteps({ steps, currentStep }: ProcessStepsProps) {
  return (
    <div className="max-w-sm mx-auto mb-10">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <motion.div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 transition-all duration-500 ${
                index <= currentStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {/* Step icon/indicator */}
              <div className="relative">
                <motion.div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    index < currentStep
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md'
                      : index === currentStep
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg'
                      : 'bg-gray-200'
                  }`}
                  animate={
                    index === currentStep
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: index === currentStep ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-lg"
                    >
                      {step.icon || '⚡'}
                    </motion.div>
                  ) : (
                    <span className="text-base opacity-50">{step.icon || '○'}</span>
                  )}
                </motion.div>
                
                {/* Pulse effect for current step */}
                {index === currentStep && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-emerald-400"
                    animate={{
                      scale: [1, 1.3, 1.3],
                      opacity: [0.5, 0, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
              
              {/* Step text with enhanced styling */}
              <div className="flex-1">
                <motion.p
                  className={`font-medium transition-all duration-500 ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.text}
                </motion.p>
                {index === currentStep && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-emerald-600 mt-1"
                  >
                    진행 중...
                  </motion.p>
                )}
              </div>
              
              {/* Success indicator */}
              {index < currentStep && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-emerald-500"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface TreatmentFAQProps {
  faqs: FAQ[];
}

export function TreatmentFAQ({ faqs }: TreatmentFAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  if (faqs.length === 0) return null;
  
  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 mb-4">자주 묻는 질문</h4>
      
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isExpanded = expandedItems.has(index);
          
          return (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 flex-1 pr-2">
                  {faq.question}
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
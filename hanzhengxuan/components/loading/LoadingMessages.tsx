'use client';

import { useEffect, useState } from 'react';

interface LoadingMessagesProps {
  messages: string[];
  interval?: number;
}

export function LoadingMessages({ messages, interval = 3000 }: LoadingMessagesProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [messages, interval]);
  
  return (
    <div className="text-center">
      <p 
        className="text-sm text-gray-600 animate-fade-in" 
        key={messageIndex}
      >
        {messages[messageIndex]}
      </p>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
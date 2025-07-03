'use client';

interface LogoPulseProps {
  title?: string;
  subtitle?: string;
}

export function LogoPulse({ 
  title = '韩真选', 
  subtitle = 'AI가 분석 중이야' 
}: LogoPulseProps) {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        {/* Pulse rings */}
        <div className="absolute inset-0 -m-4">
          <div className="absolute inset-0 rounded-full bg-primary-mint opacity-20 animate-ping" />
          <div 
            className="absolute inset-0 rounded-full bg-primary-mint opacity-10 animate-ping"
            style={{ animationDelay: '0.5s' }}
          />
        </div>
        
        {/* Logo */}
        <div className="relative bg-white rounded-2xl px-8 py-6 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 animate-pulse">
            {title}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {subtitle}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes ping {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
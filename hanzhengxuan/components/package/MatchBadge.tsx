'use client';

interface MatchBadgeProps {
  matchScore: number;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchBadge({ matchScore, size = 'md' }: MatchBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };
  
  const getMatchLevel = (score: number) => {
    if (score >= 90) return { text: '완벽 매칭', color: 'bg-green-500' };
    if (score >= 80) return { text: '높은 일치', color: 'bg-primary-mint' };
    if (score >= 70) return { text: '좋은 매칭', color: 'bg-blue-500' };
    return { text: '추천', color: 'bg-gray-500' };
  };
  
  const { text, color } = getMatchLevel(matchScore);
  
  return (
    <div className={`inline-flex items-center gap-1.5 ${color} text-white rounded-full font-medium ${sizeClasses[size]}`}>
      <span className="font-bold">{matchScore}%</span>
      <span className="text-xs opacity-90">{text}</span>
    </div>
  );
}
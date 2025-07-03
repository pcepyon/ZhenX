'use client';

interface PriceTierFilterProps {
  selectedTier: string;
  onTierChange: (tier: string) => void;
  availableTiers: string[];
}

const tierInfo = {
  all: { label: '전체', color: 'bg-gray-600' },
  basic: { label: '베이직', color: 'bg-tier-basic' },
  premium: { label: '프리미엄', color: 'bg-tier-premium' },
  luxury: { label: '럭셔리', color: 'bg-tier-luxury' },
  ultra: { label: '울트라', color: 'bg-tier-ultra' }
};

export function PriceTierFilter({ 
  selectedTier, 
  onTierChange, 
  availableTiers 
}: PriceTierFilterProps) {
  const allTiers = ['all', ...availableTiers];
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allTiers.map((tier) => {
        const info = tierInfo[tier as keyof typeof tierInfo];
        const isSelected = selectedTier === tier;
        
        return (
          <button
            key={tier}
            onClick={() => onTierChange(tier)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${isSelected 
                ? `${info.color} text-white shadow-lg scale-105` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {info.label}
          </button>
        );
      })}
    </div>
  );
}
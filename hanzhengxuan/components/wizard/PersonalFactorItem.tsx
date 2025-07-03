'use client';

import { Checkbox } from '@/components/ui/Input';

interface PersonalFactorItemProps {
  id: string;
  label: string;
  description: string;
  icon: string;
  checked: boolean;
  onChange: () => void;
}

export function PersonalFactorItem({
  id,
  label,
  description,
  icon,
  checked,
  onChange
}: PersonalFactorItemProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-0.5">{icon}</div>
        
        <div className="flex-1">
          <label htmlFor={id} className="cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{description}</p>
              </div>
              <Checkbox
                id={id}
                checked={checked}
                onChange={onChange}
                className="mt-0.5"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
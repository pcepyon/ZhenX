'use client';

import { Checkbox } from '@/components/ui/Input';

interface ConcernItemProps {
  id: string;
  name: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

export function ConcernItem({
  id,
  name,
  description,
  checked,
  onChange
}: ConcernItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Checkbox
        id={id}
        checked={checked}
        onChange={onChange}
        className="mt-0.5"
      />
      <label 
        htmlFor={id}
        className="flex-1 cursor-pointer"
      >
        <div className="text-sm font-medium text-gray-900">{name}</div>
        {description && (
          <div className="text-xs text-gray-500 mt-0.5">{description}</div>
        )}
      </label>
    </div>
  );
}
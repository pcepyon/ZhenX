'use client';

import { Button } from '@/components/ui/Button';

interface WizardFooterProps {
  onNext: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonText?: string;
}

export function WizardFooter({ 
  onNext, 
  disabled = false, 
  loading = false,
  buttonText = '다음'
}: WizardFooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
      <div className="max-w-md mx-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={disabled || loading}
          className="w-full"
        >
          {loading ? '처리 중...' : buttonText}
        </Button>
      </div>
    </footer>
  );
}
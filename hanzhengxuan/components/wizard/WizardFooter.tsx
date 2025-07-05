'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <motion.footer 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 p-5 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-lg mx-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={disabled || loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:transform-none disabled:hover:shadow-none group"
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                처리 중...
              </>
            ) : (
              <>
                {buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </Button>
      </div>
    </motion.footer>
  );
}
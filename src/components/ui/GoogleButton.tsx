'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

interface GoogleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function GoogleButton({
  onClick,
  disabled = false,
  className = '',
  children = 'Continue with Google',
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center gap-3 rounded-full border border-neutral-300 py-3',
        'transition-all duration-300 hover:shadow-lg active:scale-95',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <GoogleIcon className="h-6 w-6" />
      <span className="font-semibold text-neutral-900">{children}</span>
    </button>
  );
}

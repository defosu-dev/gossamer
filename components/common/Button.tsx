import { cn } from '@/utils/cn';
import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({ children, variant = 'primary', onClick, disabled, className }: ButtonProps) => {
  const baseStyles = 'py-2 px-4 rounded-full font-medium transition cursor-pointer';

  const variantStyles =
    variant === 'primary'
      ? 'bg-neutral-700 text-neutral-50 hover:bg-neutral-900'
      : 'bg-neutral-50 text-neutal-900 border border-neutral-300 hover:bg-neutral-200';

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variantStyles, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

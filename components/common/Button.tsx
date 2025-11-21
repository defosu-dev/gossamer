import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps {

  /** Button content */
  children: ReactNode;

  /** Visual variant of the button */
  variant?: 'primary' | 'secondary';

  /** Click handler */
  onClick?: () => void;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable Button component.
 *
 * Supports primary and secondary variants, disabled state,
 * and accepts custom CSS classes.
 */
function Button({ children, variant = 'primary', onClick, disabled, className }: ButtonProps) {
  const baseStyles = 'py-2 px-4 rounded-full font-medium transition cursor-pointer';

  const variantStyles =
    variant === 'primary'
      ? 'bg-neutral-700 text-neutral-50 hover:bg-neutral-900'
      : 'bg-neutral-50 text-neutral-900 border border-neutral-300 hover:bg-neutral-200';

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variantStyles, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

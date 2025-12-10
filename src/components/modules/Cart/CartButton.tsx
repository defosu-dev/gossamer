'use client';

import { ShoppingCart, Loader2 } from 'lucide-react';
import { memo } from 'react';

import { cn } from '@/lib/utils/cn';

export interface CartButtonProps {
  open: boolean;
  count: number;
  onClick: () => void;
  isLoading?: boolean;
}

export function CartButton({ open, count, onClick, isLoading = false }: CartButtonProps) {
  return (
    <button
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label={isLoading ? 'Loading cart' : 'Open cart'}
      onClick={onClick}
      type="button"
      disabled={isLoading}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-full',
        'border border-neutral-300 bg-white shadow-sm',
        'transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner',
        'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none',
        isLoading && 'cursor-not-allowed opacity-70'
      )}
    >
      {isLoading ? (
        <Loader2 className="size-4.5 animate-spin text-neutral-500" />
      ) : (
        <ShoppingCart className="size-4.5 text-gray-700" />
      )}

      {!isLoading && count > 0 && (
        <div
          className={cn(
            'absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white'
          )}
        >
          <span className="text-[10px] font-bold text-white">{count > 99 ? '99+' : count}</span>
        </div>
      )}
    </button>
  );
}

export default memo(CartButton);

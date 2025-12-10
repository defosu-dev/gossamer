'use client';

import { memo, useCallback } from 'react';
import { Trash } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

/**
 * Props for {@link DeleteButton}.
 */
export interface DeleteButtonProps {
  /**
   * Callback executed when the delete action is triggered.
   */
  onDelete: () => void;

  /**
   * Determines whether the button visibility is controlled by parent group hover.
   *
   * @default true
   * - `true`: button is hidden initially (`opacity-0`) and becomes visible on parent `.group:hover`.
   * - `false`: button is always visible.
   */
  isGroupHoverEnabled?: boolean;
}

/**
 * DeleteButton.
 *
 * A compact, accessible icon-only button for item removal.
 *
 * @remarks
 * - Includes `aria-label="Delete Item"` for screen readers.
 * - Fully keyboard-accessible (`button` element with focus-visible styling).
 * - Visibility can be optionally controlled by `group-hover`.
 * - **Exported in two forms**:
 *   - `DeleteButton` — original function (for tests, HOC)
 *   - `default export` — memoized version (for production)
 */
export function DeleteButton({ onDelete, isGroupHoverEnabled = true }: DeleteButtonProps) {
  const handleClick = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <button
      type="button"
      aria-label="Delete Item"
      onClick={handleClick}
      className={cn(
        'cursor-pointer text-neutral-400 transition-all duration-300 hover:text-red-500',
        'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none',
        isGroupHoverEnabled ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
      )}
    >
      <Trash className="size-4" focusable={false} />
    </button>
  );
}

export default memo(DeleteButton);

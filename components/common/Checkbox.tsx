'use client';

import { memo, useCallback, type ChangeEvent } from 'react';

import { cn } from '@/utils/cn';

/**
 * Props for the custom Checkbox component.
 */
export interface CheckboxProps {

  /** Whether the checkbox is checked */
  checked: boolean;

  /** Callback when checkbox state changes */
  onCheckedChange: (checked: boolean) => void;

  /** Optional label text (if not using children) */
  label?: string;

  /** Optional additional class names */
  className?: string;

  /** Disables the checkbox */
  disabled?: boolean;
}

/**
 * Checkbox.
 *
 * Fully custom, accessible checkbox with Tailwind styling.
 * Supports label, disabled state, and keyboard interaction.
 *
 * @remarks
 * - Uses native `<input type="checkbox">` for accessibility.
 * - Custom visual indicator with checkmark.
 * - Focus ring and hover states included.
 */
export function Checkbox({
  checked,
  onCheckedChange,
  label,
  className,
  disabled = false,
}: CheckboxProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onCheckedChange(e.target.checked);
    },
    [onCheckedChange]
  );

  const hasLabel = label != null && label !== '';

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="peer sr-only"
        aria-label={label ?? undefined}
      />
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border-2 transition-all',
          'border-neutral-400 peer-focus-visible:ring-2 peer-focus-visible:ring-red-500 peer-focus-visible:ring-offset-2',
          checked ? 'border-red-500 bg-red-500' : 'bg-white hover:border-neutral-600',
          disabled && 'border-neutral-300 bg-neutral-100'
        )}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {hasLabel && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export default memo(Checkbox);

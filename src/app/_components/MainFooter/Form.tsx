'use client';

import { memo } from 'react';

import { cn } from '@/lib/utils/cn';
import Button from '@/components/ui/Button';

interface FormProps {
  /** Placeholder text for the email input */
  placeholder?: string;

  /** Text displayed on the submit button */
  buttonText?: string;
}

/**
 * Email subscription/search form with an input field and primary action button.
 *
 * @remarks
 * This is a client component required for handling user input focus and keyboard events.
 * The actual form submission logic should be implemented in a parent component or
 * via a form wrapper if needed.
 */
export function Form({ placeholder = 'Enter your email', buttonText = 'Subscribe' }: FormProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-full items-center overflow-hidden rounded-full p-0.5',
        'bg-white shadow-sm transition-shadow',
        'duration-200 focus-within:shadow-md focus-within:shadow-neutral-100/20',
        'md:w-96'
      )}
    >
      <input
        type="email"
        placeholder={placeholder}
        className={cn(
          'h-full flex-1 px-5 text-sm outline-none placeholder:text-zinc-500',
          'disabled:cursor-not-allowed disabled:opacity-60'
        )}
        aria-label="Email address"
      />

      <Button variant="primary" className="h-full rounded-r-full px-6">
        {buttonText}
      </Button>
    </div>
  );
}

export default memo(Form);

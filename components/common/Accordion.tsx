'use client';

import React, { type ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

interface AccordionProps {
  title: string;
  answer: ReactNode;
}

/**
 * Collapsible accordion component.
 *
 * @remarks
 * Client component that shows/hides content when the header is clicked.
 */
export function Accordion({ title, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('rounded-lg border border-dashed bg-white shadow-sm')}>
      <button
        onClick={() => setOpen(!open)}
        className={cn('flex w-full items-center justify-between p-4')}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn('h-5 w-5 text-gray-500 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && <div className={cn('px-4 pb-4 text-sm text-gray-600')}>{answer}</div>}
    </div>
  );
}

export default Accordion;

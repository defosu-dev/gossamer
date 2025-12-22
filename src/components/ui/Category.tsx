'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubItem {
  label: string;
  icon?: React.ReactNode;
}

interface CategoryProps {
  title: string;
  icon?: React.ReactNode;
  sub?: SubItem[];
}

export function Category({ title, icon, sub = [] }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {/* TITLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg p-4 font-medium hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-600">{icon}</span>}
          <span>{title}</span>
        </div>

        {sub.length > 0 && (
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {isOpen && sub.length > 0 && (
        <ul className="relative mt-2 ml-6 space-y-4 pb-4 pl-6 before:absolute before:top-0 before:bottom-4 before:left-0 before:border-l before:border-gray-300">
          {sub.map((item, index) => {
            const isLast = index === sub.length - 1;

            return (
              <li key={item.label} className="relative flex min-h-[2rem] items-center gap-2">
                {/* horizontal connector from vertical line */}
                <span className="absolute top-1/2 left-[-1.5rem] w-4 -translate-y-1/2 border-t border-gray-300" />

                {/* cut vertical line exactly at last item center */}
                {isLast && (
                  <span className="absolute top-1/2 left-[-1.5rem] h-full w-px bg-white" />
                )}

                {item.icon && <span className="text-gray-500">{item.icon}</span>}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

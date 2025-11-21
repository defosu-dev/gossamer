'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubItem {

  /** Label for the sub-item */
  label: string;

  /** Optional icon for the sub-item */
  icon?: React.ReactNode;
}

interface CategoryProps {

  /** Title of the category */
  title: string;

  /** Optional array of sub-items */
  sub?: SubItem[];
}

/**
 * Category component with expandable sub-items.
 *
 * Renders a clickable title that expands/collapses a list of sub-items.
 * Each sub-item can have an optional icon.
 *
 * @remarks
 * - Uses `ChevronDown` icon that rotates when expanded.
 * - Sub-items are connected visually with a vertical line.
 */
export function Category({ title, sub = [] }: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg p-4 font-medium hover:bg-gray-50"
      >
        {title}
        {sub.length > 0 && (
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {isOpen && sub.length > 0 && (
        <ul className="relative space-y-3 pb-4 pl-6 text-sm text-gray-700">
          {/* Vertical connector line */}
          <div className="absolute top-0 left-2 h-[calc(100%-1.25rem)] border-l border-gray-300" />

          {sub.map((item, index) => {
            const isLast = index === sub.length - 1;
            return (
              <li key={item.label} className="relative flex items-center gap-2">
                {/* Small connector */}
                <span
                  className={`absolute top-1/2 -left-4 h-4 w-4 border-t border-gray-300 ${
                    isLast ? 'rounded-bl-lg border-l' : 'border-l'
                  }`}
                />
                {item.icon}
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

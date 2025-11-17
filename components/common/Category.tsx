'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SubItem = {
  label: string;
  icon?: React.ReactNode;
};

type CategoryProps = {
  title: string;
  sub?: SubItem[];
};

export const Category = ({ title, sub = [] }: CategoryProps) => {
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
          <div className="absolute top-0 left-2 h-[calc(100%-1.25rem)] border-l border-gray-300"></div>

          {sub.map((s, i) => {
            const isLast = i === sub.length - 1;
            return (
              <li key={s.label} className="relative flex items-center gap-2">
                <span
                  className={`absolute top-1/2 -left-4 h-4 w-4 border-t border-gray-300 ${
                    isLast ? 'rounded-bl-lg border-l' : 'border-l'
                  }`}
                ></span>
                {s.icon}
                {s.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

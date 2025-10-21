"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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
        className="flex justify-between items-center w-full p-4 font-medium hover:bg-gray-50 rounded-lg"
      >
        {title}
        {sub.length > 0 && (
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && sub.length > 0 && (
        <ul className="relative pl-6 pb-4 text-sm text-gray-700 space-y-3">
          <div className="absolute left-2 top-0 h-[calc(100%-1.25rem)] border-l border-gray-300"></div>

          {sub.map((s, i) => {
            const isLast = i === sub.length - 1;
            return (
              <li key={s.label} className="relative flex items-center gap-2">
                <span
                  className={`absolute -left-4 top-1/2 w-4 h-4 border-t border-gray-300 ${
                    isLast ? "border-l rounded-bl-lg" : "border-l"
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

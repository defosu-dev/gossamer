"use client";
import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionProps = {
  title: string;
  answer: ReactNode;
};

export const Accordion = ({ title, answer }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white shadow-sm border-dashed border-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-600">{answer}</div>}
    </div>
  );
};

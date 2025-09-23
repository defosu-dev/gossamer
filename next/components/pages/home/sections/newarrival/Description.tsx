import React from "react";
import { ReactNode } from "react";

type DescriptionProps = {
  children: ReactNode;
};

export default function Description({ children }: DescriptionProps) {
  return <p className="text-gray-500 leading-relaxed mb-8">{children}</p>;
}

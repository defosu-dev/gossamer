import React from "react";
import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export default function Title({ children }: TitleProps) {
  return <h1 className="text-5xl font-bold mb-4">{children}</h1>;
}

import React from "react";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const Button = ({ children, variant = "primary" }: ButtonProps) => {
  const baseStyles =
    "py-2 px-10 mt-10 rounded-4xl font-medium transition-colors duration-200 ease-in-out";
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-zink-900",
    secondary:
      "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>{children}</button>
  );
};

export default Button;

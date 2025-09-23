import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const Button = ({ children, variant = "primary" }: ButtonProps) => {
  const baseStyles = "py-2 px-4 rounded-full font-medium ";

  const variantStyles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50";

  return (
    <button className={`${baseStyles} ${variantStyles}`}>{children}</button>
  );
};

export default Button;

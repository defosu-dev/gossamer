import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void; // ← добавляем поддержку клика
};

const Button = ({ children, variant = "primary", onClick }: ButtonProps) => {
  const baseStyles = "py-2 px-4 rounded-full font-medium transition";

  const variantStyles =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </button>
  );
};

export default Button;

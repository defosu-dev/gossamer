import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void; // ← добавляем поддержку клика
};

const Button = ({ children, variant = "primary", onClick }: ButtonProps) => {
  const baseStyles =
    "py-2 px-4 rounded-full font-medium transition cursor-pointer";

  const variantStyles =
    variant === "primary"
      ? "bg-gray-700 text-white hover:bg-gray-900"
      : "bg-gray-50 text-black border border-neutral-300 hover:bg-gray-200";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </button>
  );
};

export default Button;

"use client";
import React from "react";
import UserImage, { IUserImage } from "./UserImage";
import { cn } from "@/utils/cn";

type IUserButton = {
  onClick: () => void;
} & IUserImage;

export default function UserButton({ onClick, user, isLoading }: IUserButton) {
  return (
    <button
      aria-haspopup="menu"
      onClick={onClick}
      type="button"
      className={cn(
        "relative w-9 h-9 flex justify-center items-center rounded-full overflow-hidden",
        "border border-neutral-300 bg-white shadow",
        "transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner "
      )}
    >
      <UserImage isLoading={isLoading} user={user} />
    </button>
  );
}

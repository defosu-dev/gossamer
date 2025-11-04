"use client";
import { cn } from "@/utils/cn";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export type IUserDropdown = {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
};

export default function UserDropdown({
  user,
  open,
  onClose,
  onSignOut,
}: IUserDropdown) {
  const handleClose = () => {
    onClose();
    onSignOut();
  };

  return (
    <div
      role="menu"
      className={cn(
        "absolute right-0 mt-2 z-50  origin-top-right overflow-hidden",
        "flex flex-col",
        "min-w-3xs md:max-w-lg",
        "transition-all duration-200",
        "bg-white border border-neutral-300 rounded-xl shadow-xl",
        open
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
      )}
    >
      <div className="border-b border-gray-200 px-3 py-2 flex justify-between items-center gap-4">
        <span className="text font-bold">{user?.user_metadata.full_name}</span>
      </div>
      <ul className="max-h-96 h-full flex flex-col overflow-y-auto scroll-smooth divide-y divide-gray-200">
        <Link
          href="auth/profile"
          onClick={onClose}
          className="px-6 py-1.5 font-semibold"
        >
          • Profile
        </Link>
      </ul>

      <div className="border-t border-gray-200 px-3 py-2 flex justify-between items-center gap-4">
        <button onClick={handleClose} className="text font-bold cursor-pointer">
          Sign Out
        </button>
      </div>
    </div>
  );
}

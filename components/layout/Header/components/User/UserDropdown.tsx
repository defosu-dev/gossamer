'use client';
import { cn } from '@/utils/cn';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

export type IUserDropdown = {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
};

export default function UserDropdown({ user, open, onClose, onSignOut }: IUserDropdown) {
  const handleClose = () => {
    onClose();
    onSignOut();
  };

  return (
    <div
      role="menu"
      className={cn(
        'absolute right-0 z-50 mt-2 origin-top-right overflow-hidden',
        'flex flex-col',
        'min-w-3xs md:max-w-lg',
        'transition-all duration-200',
        'rounded-xl border border-neutral-300 bg-white shadow-xl',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-1 scale-95 opacity-0'
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-3 py-2">
        <span className="text font-bold">{user?.user_metadata.full_name}</span>
      </div>
      <ul className="flex h-full max-h-96 flex-col divide-y divide-gray-200 overflow-y-auto scroll-smooth">
        <Link href="auth/profile" onClick={onClose} className="px-6 py-1.5 font-semibold">
          • Profile
        </Link>
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-3 py-2">
        <button onClick={handleClose} className="text cursor-pointer font-bold">
          Sign Out
        </button>
      </div>
    </div>
  );
}

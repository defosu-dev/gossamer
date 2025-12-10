'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';
import type { UserDTO } from '@/types/api';

interface UserDropdownProps {
  user: UserDTO | null | undefined;
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

export function UserDropdown({ user, open, onClose, onSignOut }: UserDropdownProps) {
  const handleSignOut = () => {
    onSignOut();
    onClose();
  };

  if (!user) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={cn(
        'absolute top-full right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-xl',
        'border border-zinc-200 bg-white shadow-lg ring-1 ring-black/5',
        'transition-all duration-200 ease-out',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      )}
    >
      <div className={cn('border-b border-zinc-100 bg-zinc-50/50 px-4 py-3')}>
        <p className={cn('truncate text-sm font-medium text-zinc-900')}>{user.name ?? 'User'}</p>
        <p className={cn('mt-0.5 truncate text-xs text-zinc-500')}>{user.email}</p>
      </div>

      <ul className={cn('py-1')}>
        <li>
          <Link
            href={to.profile()}
            onClick={onClose}
            className={cn(
              'block px-4 py-2.5 text-sm text-zinc-700 transition-colors',
              'hover:bg-zinc-100 hover:text-zinc-900',
              'focus-visible:bg-zinc-100 focus-visible:text-zinc-900 focus-visible:outline-none'
            )}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href={to.wishlist()}
            onClick={onClose}
            className={cn(
              'block px-4 py-2.5 text-sm text-zinc-700 transition-colors',
              'hover:bg-zinc-100 hover:text-zinc-900',
              'focus-visible:bg-zinc-100 focus-visible:text-zinc-900 focus-visible:outline-none'
            )}
          >
            Wishlist
          </Link>
        </li>
      </ul>

      <div className={cn('border-t border-zinc-100 px-1 py-1')}>
        <button
          onClick={handleSignOut}
          className={cn(
            'w-full text-left text-sm font-medium text-red-600 transition-colors',
            'rounded-md px-3 py-2 hover:bg-red-50 hover:text-red-700',
            'focus-visible:bg-red-50 focus-visible:text-red-700 focus-visible:outline-none'
          )}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default UserDropdown;

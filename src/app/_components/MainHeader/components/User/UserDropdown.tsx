'use client';

import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

interface UserDropdownProps {
  /** Currently authenticated user object from Supabase */
  user: User | null;

  /** Controls dropdown visibility */
  open: boolean;

  /** Callback to close the dropdown */
  onClose: () => void;

  /** Callback to initiate sign-out flow */
  onSignOut: () => void;
}

/**
 * User account dropdown menu displayed when clicking the avatar in the header.
 *
 * @remarks
 * This is a client component required for handling click events on links and the sign-out button.
 * Uses conditional Tailwind classes for smooth mount/unmount animation.
 * All navigation uses Next.js Link with onClick closure for immediate dropdown dismissal.
 */
export function UserDropdown({ user, open, onClose, onSignOut }: UserDropdownProps) {
  const handleSignOut = () => {
    onSignOut();
    onClose();
  };

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      className={cn(
        'absolute top-full right-0 z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-xl',
        'ring-opacity-5 border border-zinc-300 bg-white shadow-lg ring-1 ring-black',
        'transition-all duration-200 ease-out',
        open
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      )}
    >
      {/* User Info Header */}
      <div className={cn('border-b border-zinc-200 px-4 py-3')}>
        <p className={cn('text-sm font-medium text-zinc-900')}>
          {user?.user_metadata?.full_name ?? 'User'}
        </p>
        <p className={cn('truncate text-xs text-zinc-500')}>{user?.email}</p>
      </div>

      {/* Menu Items */}
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
            href={to.profile()}
            onClick={onClose}
            className={cn(
              'block px-4 py-2.5 text-sm text-zinc-700 transition-colors',
              'hover:bg-zinc-100 hover:text-zinc-900',
              'focus-visible:bg-zinc-100 focus-visible:text-zinc-900 focus-visible:outline-none'
            )}
          >
            Settings
          </Link>
        </li>
      </ul>

      {/* Sign Out Footer */}
      <div className={cn('border-t border-zinc-200 px-4 py-3')}>
        <button
          onClick={handleSignOut}
          className={cn(
            'w-full text-left text-sm font-medium text-red-600 transition-colors',
            'rounded-md px-2 py-1.5 hover:bg-red-50 hover:text-red-700',
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

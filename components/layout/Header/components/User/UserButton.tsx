'use client';

import { cn } from '@/utils/cn';

import UserImage, { type UserImageProps } from './UserImage';

interface UserButtonProps extends UserImageProps {

  /** Callback triggered when the button is clicked */
  onClick: () => void;
}

/**
 * Header user avatar button that toggles the account dropdown menu.
 *
 * @remarks
 * This is a client component due to the onClick handler and interactive states.
 * Renders a circular avatar with loading/placeholder states handled by UserImage.
 * Includes hover, active, and focus-visible styles for full accessibility.
 */
export function UserButton({ onClick, user, isLoading }: UserButtonProps) {
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-label={user ? 'Open user menu' : 'Sign in'}
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full',
        'border border-zinc-300 bg-white shadow-sm',
        'transition-all duration-150',
        'hover:border-zinc-400 hover:shadow-md',
        'active:scale-95 active:shadow',
        'focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none'
      )}
    >
      <UserImage user={user} isLoading={isLoading} />
    </button>
  );
}

export default UserButton;

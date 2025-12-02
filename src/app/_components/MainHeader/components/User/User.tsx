'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

import UserButton from './UserButton';
import UserDropdown from './UserDropdown';
import DarkBackground from '@/components/ui/DarkBackground';
import { useAuth } from '@/lib/hooks/useAuth';
import { to } from '@/config/routes';

/**
 * User account control in the header with authentication-aware dropdown menu.
 *
 * @remarks
 * This is a client component required for managing dropdown state and handling
 * authentication redirects. Uses useState for local open/close state and useRouter
 * for unauthenticated navigation to sign-in page.
 */
export function User() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (!user) {
      router.push(to.login());
      return;
    }
    setIsOpen((prev) => !prev);
  }, [user, router]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    handleClose();
  }, [signOut, handleClose]);

  return (
    <div className={cn('relative')}>
      <UserButton isLoading={loading} onClick={handleClick} user={user} />

      <DarkBackground open={isOpen} onClose={handleClose} />

      <UserDropdown user={user} open={isOpen} onClose={handleClose} onSignOut={handleSignOut} />
    </div>
  );
}

export default User;

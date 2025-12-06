'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

import { useUser } from '@/hooks/useUser';
import { useLogout } from '@/hooks/useAuth';

import UserButton from './UserButton';
import UserDropdown from './UserDropdown';
import DarkBackground from '@/components/ui/DarkBackground';

/**
 * User account control in the header.
 * Connects to the new React Query hooks structure.
 */
export function User() {
  const router = useRouter();

  const { user, isLoading } = useUser();

  const { mutate: logout } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (!user && !isLoading) {
      router.push(to.login());
      return;
    }
    if (user) {
      setIsOpen((prev) => !prev);
    }
  }, [user, isLoading, router]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSignOut = useCallback(() => {
    logout();
    handleClose();
  }, [logout, handleClose]);

  return (
    <div className={cn('relative')}>
      <UserButton isLoading={isLoading} onClick={handleClick} user={user} />

      <DarkBackground open={isOpen} onClose={handleClose} />

      <UserDropdown user={user} open={isOpen} onClose={handleClose} onSignOut={handleSignOut} />
    </div>
  );
}

export default User;

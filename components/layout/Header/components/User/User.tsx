'use client';

import { useAuth } from '@/hooks';
import { useState } from 'react';
import UserButton from './UserButton';
import DarkBackground from '@/components/common/DarkBackground';
import { useRouter } from 'next/navigation';
import UserDropdown from './UserDropdown';

const User = () => {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!user) return router.push('/auth/sign-in');
    setIsOpen((s) => !s);
  };

  return (
    <div className="relative">
      <UserButton isLoading={loading} onClick={() => handleClick()} user={user} />
      <DarkBackground open={isOpen} onClose={() => setIsOpen(false)} />
      <UserDropdown
        user={user}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSignOut={() => signOut()}
      />
    </div>
  );
};

export default User;

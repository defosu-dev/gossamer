'use client';

import { cn } from '@/lib/utils/cn';
import type { UserDTO } from '@/types/api'; // Використовуємо наш DTO

// Припускаю, що UserImage теж треба оновити під UserDTO,
// або передавати в нього конкретні рядки (src, alt)
import UserImage from './UserImage';

interface UserButtonProps {
  user: UserDTO | null | undefined; // Додаємо undefined для безпеки
  isLoading: boolean;
  onClick: () => void;
}

export function UserButton({ onClick, user, isLoading }: UserButtonProps) {
  const label = user ? `Open user menu for ${user.name}` : 'Sign in';

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-label={label}
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'flex h-10 w-10 items-center justify-center overflow-hidden rounded-full',
        'border border-zinc-300 bg-white shadow-sm',
        'transition-all duration-150',
        'hover:border-zinc-400 hover:shadow-md',
        'active:scale-95 active:shadow',
        'focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none',
        isLoading && 'cursor-not-allowed opacity-70'
      )}
    >
      {/* 
         Важливо: переконайтеся, що UserImage приймає UserDTO.
         Якщо UserImage старий, можливо, краще передати пропси напряму:
         src={user?.avatar_url} alt={user?.name}
      */}
      <UserImage user={user} isLoading={isLoading} />
    </button>
  );
}

export default UserButton;

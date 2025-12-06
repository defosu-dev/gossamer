import { Loader2, UserRound } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { UserDTO } from '@/types/api';

/**
 * Props for UserImage.
 */
export interface UserImageProps {
  isLoading: boolean;
  user: UserDTO | null | undefined;
}

/**
 * Renders user avatar with loading, authenticated, and guest states.
 */
export function UserImage({ isLoading, user }: UserImageProps) {
  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center bg-neutral-100">
        <Loader2 className="size-4 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (user) {
    return (
      <ImageWithFallback
        src={user.avatar_url ?? ''}
        alt={user.name ?? 'User avatar'}
        className="size-full object-cover"
      />
    );
  }

  return (
    <div
      className={cn(
        'flex size-full items-center justify-center',
        'text-neutral-600 transition-colors group-hover:text-neutral-800'
      )}
    >
      <UserRound className="size-5" />
    </div>
  );
}

export default UserImage;

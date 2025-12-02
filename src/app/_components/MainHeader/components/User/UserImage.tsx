import type { User } from '@supabase/supabase-js';
import { Loader2, UserRound } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { to } from '@/config/routes';

/**
 *
 */
export interface UserImageProps {
  isLoading: boolean;
  user: User | null;
}

/**
 * Renders user avatar with loading, authenticated, and guest states.
 *
 * @remarks
 * Displays spinner during loading, user image when authenticated,
 * and sign-in link with silhouette icon when not authenticated.
 */
export function UserImage({ isLoading, user }: UserImageProps) {
  return (
    <>
      {isLoading ? (
        <div className="flex size-full items-center justify-center bg-neutral-200/40">
          <Loader2 className="size-4 animate-spin text-gray-500" />
        </div>
      ) : user ? (
        <ImageWithFallback
          src={user.user_metadata?.avatar_url ?? '/placeholder.jpg'}
          alt="User avatar"
          className="size-4 object-cover"
        />
      ) : (
        <Link
          href={to.login()}
          className={cn(
            'flex size-full items-center justify-center',
            'transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-500 focus:outline-none',
            'rounded-full'
          )}
          aria-label="Sign in"
        >
          <UserRound className="size-4.5 text-gray-700" />
        </Link>
      )}
    </>
  );
}

export default UserImage;

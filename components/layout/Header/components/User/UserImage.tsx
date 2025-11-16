import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { cn } from "@/utils/cn";
import { User } from "@supabase/supabase-js";
import { Loader2, UserRound } from "lucide-react";
import Link from "next/link";

export type IUserImage = {
  isLoading: boolean;
  user: User | null;
};

const UserImage = ({ isLoading = true, user: User }: IUserImage) => {
  return (
    <>
      {isLoading ? (
        <div className="flex size-full items-center justify-center bg-neutral-200/40">
          <Loader2 className="size-4 animate-spin text-gray-500" />
        </div>
      ) : User ? (
        <ImageWithFallback
          src={User.user_metadata?.avatar_url ?? "/placeholder.jpg"}
          alt="User avatar"
          className="size-full object-cover"
        />
      ) : (
        <Link
          href="/auth/sign-in"
          className={cn(
            "flex size-full items-center justify-center",
            "transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500",
            "rounded-full"
          )}
          aria-label="Sign in"
        >
          <UserRound className="size-4.5 text-gray-700" />
        </Link>
      )}
    </>
  );
};

export default UserImage;

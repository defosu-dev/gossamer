"use client";

import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { useAuth } from "@/hooks";
import { cn } from "@/utils/cn";
import { Loader2, UserRound } from "lucide-react";
import Link from "next/link";

const UserAvatar = () => {
  const { user, loading } = useAuth();

  return (
    <div
      className={cn(
        "w-9 h-9 overflow-hidden rounded-full border border-neutral-300",
        "flex justify-center items-center"
      )}
    >
      {loading ? (
        <div className="flex size-full items-center justify-center bg-neutral-200/40">
          <Loader2 className="size-4 animate-spin text-gray-500" />
        </div>
      ) : user ? (
        <ImageWithFallback
          src={
            user.user_metadata?.avatar_url ?? "https://via.placeholder.com/36"
          }
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
    </div>
  );
};

export default UserAvatar;

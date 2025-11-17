'use client';
import React from 'react';
import UserImage, { IUserImage } from './UserImage';
import { cn } from '@/utils/cn';

type IUserButton = {
  onClick: () => void;
} & IUserImage;

export default function UserButton({ onClick, user, isLoading }: IUserButton) {
  return (
    <button
      aria-haspopup="menu"
      onClick={onClick}
      type="button"
      className={cn(
        'relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full',
        'border border-neutral-300 bg-white shadow',
        'transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner'
      )}
    >
      <UserImage isLoading={isLoading} user={user} />
    </button>
  );
}

import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export function UpdatePasswordFormSkeleton() {
  return (
    <div
      className={cn(
        'w-full max-w-md min-w-xs md:max-w-3xl',
        'rounded-3xl border border-neutral-100 bg-white p-2 shadow-sm',
        'grid grid-cols-1 gap-4 md:grid-cols-11'
      )}
    >
      {/* Left Column Skeleton */}
      <div className={cn('col-span-full md:col-span-6', 'flex flex-col items-center p-4')}>
        <div className="h-12 w-12 rounded-full bg-neutral-100" />

        <div className="mt-4 h-8 w-3/4 animate-pulse rounded-lg bg-neutral-100" />
        <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-neutral-100" />

        <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-neutral-50" />
        <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-neutral-50" />

        <div className="mt-6 flex h-12 w-full animate-pulse items-center justify-center rounded-full bg-neutral-100">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-300" />
        </div>
      </div>

      {/* Right Column */}
      <div
        className={cn(
          'hidden md:col-span-5 md:block',
          'rounded-2xl bg-neutral-900 p-4 opacity-50 shadow'
        )}
      />
    </div>
  );
}

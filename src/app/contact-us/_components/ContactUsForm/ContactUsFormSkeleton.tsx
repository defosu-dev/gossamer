import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

function ContactUsFormSkeleton() {
  return (
    <div
      className={cn(
        'my-8 w-full max-w-md min-w-xs flex-1',
        'rounded-3xl border border-neutral-100 p-8 shadow-sm',
        'flex flex-col items-center',
        'bg-white'
      )}
    >
      {/* Title */}
      <div className="mt-4 h-8 w-1/2 animate-pulse rounded-lg bg-neutral-100" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded-lg bg-neutral-100" />

      {/* Fields */}
      <div className="mt-8 flex w-full flex-col gap-4">
        {/* First + Last Name */}
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <div className="h-12 w-full animate-pulse rounded-full bg-neutral-50" />
          <div className="h-12 w-full animate-pulse rounded-full bg-neutral-50" />
        </div>

        {/* Email */}
        <div className="h-12 w-full animate-pulse rounded-full bg-neutral-50" />

        {/* Phone */}
        <div className="h-12 w-full animate-pulse rounded-full bg-neutral-50" />

        {/* Message textarea */}
        <div className="h-28 w-full animate-pulse rounded-2xl bg-neutral-50" />

        {/* Submit Button */}
        <div className="mt-2 flex h-12 w-full animate-pulse items-center justify-center rounded-full bg-neutral-100">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-300" />
        </div>

        {/* Terms */}
        <div className="mx-auto mt-6 flex flex-col items-center gap-2">
          <div className="h-4 w-40 animate-pulse rounded bg-neutral-100" />
          <div className="h-4 w-52 animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    </div>
  );
}

export default ContactUsFormSkeleton;

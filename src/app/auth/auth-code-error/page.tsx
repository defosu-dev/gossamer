import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';

export default function AuthCodeErrorPage() {
  return (
    <div
      className={cn(
        'w-full max-w-md',
        'rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm',
        'flex flex-col items-center text-center'
      )}
    >
      <LogoIcon className="mb-6 size-12" />

      <div className="mb-4 rounded-full bg-red-50 p-4">
        <AlertCircle className="size-8 text-red-500" />
      </div>

      <h2 className="text-2xl font-bold text-neutral-900">Authentication Error</h2>

      <p className="mt-2 text-neutral-600">
        The link you used is invalid or has expired. This can happen if you copy-pasted the link
        incorrectly or if too much time has passed.
      </p>

      <div className="mt-8 w-full space-y-3">
        <Link
          href={to.login()}
          className={cn(
            'flex w-full items-center justify-center rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800'
          )}
        >
          Back to Sign In
        </Link>

        <Link
          href={to.forgotPassword()}
          className={cn(
            'flex w-full items-center justify-center rounded-full border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-50'
          )}
        >
          Resend Link
        </Link>
      </div>
    </div>
  );
}

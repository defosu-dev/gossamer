'use client';

import { useForm } from '@tanstack/react-form';
import { Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import { useForgotPassword } from '@/hooks/useAuth';
import { forgotPasswordSchema } from '@/lib/validator/auth';

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      forgotPassword(
        { email: value.email },
        {
          onError: (err: unknown) => {
            if (err instanceof Error) {
              setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'error' in err) {
              setError(String((err as { error: unknown }).error));
            } else {
              setError('Failed to send reset link');
            }
          },
        }
      );
    },
  });

  const isLoading = isPending || form.state.isSubmitting;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn(
        'w-full max-w-md min-w-xs md:max-w-3xl',
        'rounded-3xl border border-neutral-100 p-2 shadow-sm',
        'grid grid-cols-1 gap-4 md:grid-cols-11',
        'bg-white'
      )}
      noValidate
    >
      {/* Left Column */}
      <div className={cn('col-span-full md:col-span-6', 'flex flex-col items-center p-4')}>
        <LogoIcon className="size-12" />
        <h2 className={cn('text-3xl font-bold', 'mt-4')}>Reset Password</h2>
        <p className={cn('text-sm text-neutral-800', 'mt-2 text-center')}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <>
              <div className={cn('group relative mt-8', 'w-full')}>
                <Mail className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-800" />
                <input
                  type="email"
                  placeholder="Your email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'text-sm font-medium text-neutral-900 placeholder-neutral-700',
                    'h-full w-full rounded-full border py-3 pl-9',
                    field.state.meta.errors.length
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-neutral-500',
                    'focus:border-transparent focus:ring-2 focus:outline-none',
                    'transition-all duration-200',
                    'disabled:opacity-50'
                  )}
                />
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                  {typeof error === 'string' ? error : (error as Error)?.message}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'mt-6 w-full',
            'bg-neutral-900 font-semibold text-white',
            'rounded-full py-3',
            'cursor-pointer hover:shadow-lg',
            'active:scale-95 active:shadow-inner',
            'transition-all duration-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'flex items-center justify-center gap-2'
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
        {error && <p className="mt-2 w-full text-sm text-red-600">{error}</p>}

        {/* Back to Login */}
        <div className="mt-6 flex w-full justify-center">
          <Link
            href={to.login()}
            className="text-sm font-semibold text-neutral-800 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div
        className={cn('hidden md:col-span-5 md:block', 'rounded-2xl bg-neutral-900 p-4 shadow')}
      />
    </form>
  );
}

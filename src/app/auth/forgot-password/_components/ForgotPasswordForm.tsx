'use client';

import { useForm } from '@tanstack/react-form';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import { useForgotPassword } from '@/hooks/useAuth';
import { forgotPasswordSchema } from '@/lib/validator/auth';
import InputField from '@/components/ui/InputField';
import SubmitButton from '@/components/ui/SubmitButton';

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
        <p className={cn('text-sm text-neutral-800', 'mt-2 mb-8 text-center')}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <div className="mb-8 flex w-full flex-col gap-4">
          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <InputField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="Your email"
                icon={<Mail className="size-4.5" />}
                type="email"
              />
            )}
          </form.Field>
        </div>

        {/* Submit */}
        <SubmitButton
          title="Send Reset Link"
          titleLoading="Sending link..."
          isLoading={isLoading}
        />
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

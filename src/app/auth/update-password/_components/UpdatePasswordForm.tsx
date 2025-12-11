'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { cn } from '@/lib/utils/cn';

import { useUpdatePassword } from '@/hooks/useAuth';
import { updatePasswordSchema } from '@/lib/validator/auth';
import { PasswordField } from '@/components/ui/PasswordField';
import SubmitButton from '@/components/ui/SubmitButton';

export function UpdatePasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: updatePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      updatePassword(
        {
          password: value.password,
          confirmPassword: value.confirmPassword,
        },
        {
          onError: (err: unknown) => {
            if (err instanceof Error) {
              setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'error' in err) {
              setError(String((err as { error: unknown }).error));
            } else {
              setError('Failed to update password');
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
        <h2 className={cn('text-3xl font-bold', 'mt-4')}>Set New Password</h2>
        <p className={cn('text-sm text-neutral-800', 'mt-2 mb-8 text-center')}>
          Please enter your new password below.
        </p>

        <div className="mb-8 flex w-full flex-col gap-4">
          {/* New Password */}
          <form.Field name="password">
            {(field) => (
              <PasswordField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="New password"
                icon={<Lock className="size-4.5" />}
                disabled={isLoading}
                autoComplete="current-password"
              />
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field name="confirmPassword">
            {(field) => (
              <PasswordField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="Confirm New Password"
                icon={<Lock className="size-4.5" />}
                disabled={isLoading}
                autoComplete="current-password"
              />
            )}
          </form.Field>
        </div>

        {/* Submit */}
        <SubmitButton title="Update Password" titleLoading="Updating..." isLoading={isLoading} />
        {error && <p className="mt-2 w-full text-sm text-red-600">{error}</p>}
      </div>

      {/* Right Column (decorative) */}
      <div
        className={cn('hidden md:col-span-5 md:block', 'rounded-2xl bg-neutral-900 p-4 shadow')}
      />
    </form>
  );
}

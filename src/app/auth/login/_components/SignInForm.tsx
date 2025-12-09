'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import InputField from '@/components/ui/InputField';
import { useGoogleLogin, useLogin } from '@/hooks/useAuth';
import { signInSchema } from '@/lib/validator/auth';
import SubmitButton from '@/components/ui/SubmitButton';
import { PasswordField } from '@/components/ui/PasswordField';
import { CheckboxField } from '@/components/ui/CheckboxField';
import { GoogleButton } from '@/components/ui/GoogleButton';

export function SignInForm() {
  const { mutate: login, isPending } = useLogin();
  const { mutate: loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      login(
        {
          email: value.email,
          password: value.password,
          remember: value.remember,
        },
        {
          onError: (err: unknown) => {
            if (err instanceof Error) {
              setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'error' in err) {
              setError(String((err as { error: unknown }).error));
            } else {
              setError('Failed to sign in');
            }
          },
        }
      );
    },
  });

  const isLoading = isPending || isGooglePending || form.state.isSubmitting;

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
      {/* Left Column (Form) */}
      <div className={cn('col-span-full md:col-span-6', 'flex flex-col items-center p-4')}>
        <LogoIcon className="size-12" />
        <h2 className={cn('text-3xl font-bold', 'mt-4')}>Welcome Back</h2>
        <p className={cn('text-sm text-neutral-800', 'mt-2 mb-8')}>Are you a returning customer?</p>

        {/* --- FORM FIELDS START --- */}
        <div className="flex w-full flex-col gap-4">
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
                icon={<UserRound className="size-4.5" />}
                type="email"
              />
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <PasswordField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="Your password"
                icon={<Lock className="size-4.5" />}
                disabled={isLoading}
                autoComplete="current-password"
              />
            )}
          </form.Field>
        </div>

        {/* Remember & Forgot */}
        <div className="mt-4 mb-6 flex w-full items-center justify-between">
          <form.Field name="remember">
            {(field) => (
              <CheckboxField
                name={field.name}
                checked={field.state.value}
                onChange={field.handleChange}
                disabled={isLoading}
                label="Remember me"
              />
            )}
          </form.Field>
          <Link
            href={to.forgotPassword()}
            className="text-sm font-semibold text-neutral-800 hover:underline"
          >
            Forget Password
          </Link>
        </div>

        {/* Submit */}
        <SubmitButton title="Sign In" titleLoading="Signing in..." isLoading={isLoading} />
        {error && <p className="mt-2 w-full text-sm text-red-600">{error}</p>}

        {/* Divider */}
        <div className="mt-6 flex w-full items-center gap-2">
          <div className="h-px w-full bg-neutral-200" />
          <span className="text-sm font-semibold text-neutral-400">OR</span>
          <div className="h-px w-full bg-neutral-200" />
        </div>

        {/* Google */}
        <GoogleButton onClick={() => loginWithGoogle()} disabled={isLoading} className="mt-6">
          {isGooglePending ? (
            <Loader2 className="size-5 animate-spin text-neutral-600" />
          ) : (
            'Continue with Google'
          )}
        </GoogleButton>

        {/* Footer Link */}
        <p className={cn('text-sm text-neutral-500', 'mt-4')}>
          Don&apos;t have an account?{' '}
          <Link
            href={to.register()}
            className="text-sm font-semibold text-nowrap text-neutral-800 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Column (decorative) */}
      <div
        className={cn('hidden md:col-span-5 md:block', 'rounded-2xl bg-neutral-900 p-4 shadow')}
      />
    </form>
  );
}

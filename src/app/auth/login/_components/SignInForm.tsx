'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import { useGoogleLogin, useLogin } from '@/hooks/useAuth';
import { signInSchema } from '@/lib/validator/auth';

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
        <p className={cn('text-sm text-neutral-800', 'mt-2')}>Are you a returning customer?</p>

        {/* --- FORM FIELDS START --- */}
        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <div className="mt-8 w-full">
              <div className="group relative w-full">
                <UserRound className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-800" />
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
              {field.state.meta.errors.map((err, i) => (
                <p key={i} className="mt-1 ml-2 text-xs text-red-500">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <div className="mt-3.5 w-full">
              <div className="group relative w-full">
                <Lock className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-800" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'text-sm font-medium text-neutral-900 placeholder-neutral-700',
                    'h-full w-full rounded-full border py-3 pr-12 pl-9',
                    field.state.meta.errors.length
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-neutral-500',
                    'focus:border-transparent focus:ring-2 focus:outline-none',
                    'transition-all duration-200',
                    'disabled:opacity-50'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-800"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
              {field.state.meta.errors.map((err, i) => (
                <p key={i} className="mt-1 ml-2 text-xs text-red-500">
                  {err?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        {/* Remember & Forgot */}
        <div className="mt-4 flex w-full items-center justify-between">
          <form.Field name="remember">
            {(field) => (
              <div className="flex flex-nowrap items-baseline">
                <input
                  type="checkbox"
                  id="remember"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 cursor-pointer text-sm font-medium text-neutral-600"
                >
                  Remember me
                </label>
              </div>
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
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 font-semibold text-white',
            'transition-all duration-200 hover:shadow-lg active:scale-95',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isPending || form.state.isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
        {error && <p className="mt-2 w-full text-sm text-red-600">{error}</p>}

        {/* Divider */}
        <div className="mt-6 flex w-full items-center gap-2">
          <div className="h-px w-full bg-neutral-200" />
          <span className="text-sm font-semibold text-neutral-400">OR</span>
          <div className="h-px w-full bg-neutral-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          disabled={isLoading}
          className={cn(
            'mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-neutral-300 py-3',
            'transition-all duration-300 hover:shadow-lg active:scale-95',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isGooglePending ? (
            <Loader2 className="size-5 animate-spin text-neutral-600" />
          ) : (
            <>
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span className="font-semibold text-neutral-900">Continue with Google</span>
            </>
          )}
        </button>

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

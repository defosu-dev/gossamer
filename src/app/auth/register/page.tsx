'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock, Mail, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import { useGoogleLogin, useRegister } from '@/hooks/useAuth';
import { registerSchema } from '@/lib/validator/auth';

export default function SignUpPage() {
  const { mutate: signUp, isPending } = useRegister();
  const { mutate: loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const formSchema = registerSchema.extend({
    agree: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      agree: false,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      signUp(
        {
          fullName: value.fullName,
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
              setError('Registration failed');
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
        'grid grid-cols-1 gap-4 md:grid-cols-11'
      )}
      noValidate
    >
      {/* Left Column */}
      <div className={cn('col-span-full md:col-span-6', 'flex flex-col items-center p-4')}>
        <LogoIcon className="size-12" />
        <h2 className={cn('text-3xl font-bold', 'mt-4')}>Ready to Join</h2>
        <p className={cn('text-sm text-neutral-800', 'mt-2')}>Are you ready to join us?</p>

        {/* Full Name */}
        <form.Field name="fullName">
          {(field) => (
            <>
              <div className={cn('group relative mt-8', 'w-full')}>
                <UserRound className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-800" />
                <input
                  type="text"
                  placeholder="Your full name"
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
                  {/* Безпечний доступ до повідомлення помилки */}
                  {typeof error === 'string' ? error : (error as Error)?.message}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <>
              <div className={cn('group relative mt-3.5', 'w-full')}>
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

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <>
              <div className={cn('group relative mt-3.5', 'w-full')}>
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
                  className={cn('absolute top-1/2 right-3 -translate-y-1/2', 'text-neutral-800')}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                  {typeof error === 'string' ? error : (error as Error)?.message}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Terms Checkbox */}
        <form.Field name="agree">
          {(field) => (
            <div className="mt-4 flex w-full flex-col">
              <div className="flex w-full flex-nowrap items-baseline">
                <input
                  type="checkbox"
                  id="agree"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="agree"
                  className="ml-2 cursor-pointer text-sm font-medium text-neutral-600"
                >
                  I agree to the Gossamer terms and conditions and the privacy policy
                </label>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.map((error, index) => (
                  <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                    {typeof error === 'string' ? error : (error as Error)?.message}
                  </p>
                ))}
            </div>
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
              Creating account...
            </>
          ) : (
            'Sign Up'
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
            'mt-6 w-full',
            'rounded-full border border-neutral-300',
            'flex items-center justify-center gap-3 py-3',
            'cursor-pointer hover:shadow-lg',
            'active:scale-95',
            'transition-all duration-300',
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

        {/* Sign In Link */}
        <p className={cn('text-sm text-neutral-500', 'mt-4')}>
          Have an account?{' '}
          <Link
            href={to.login()}
            className="text-sm font-semibold text-nowrap text-neutral-800 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <p className={cn('text-sm leading-6 text-neutral-500', 'mt-6 text-center')}>
          By signing up you agree to our <br />{' '}
          <Link
            href={to.faq()}
            className="text-sm font-bold text-nowrap text-neutral-800 hover:underline"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href={to.faq()}
            className="text-sm font-semibold text-nowrap text-neutral-800 hover:underline"
          >
            Privacy Policy
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

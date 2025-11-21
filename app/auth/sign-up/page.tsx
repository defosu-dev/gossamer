'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock, Mail, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks';
import LogoIcon from '@/components/common/LogoIcon';

/**
 * @remarks
 * Client-side sign-up page with full validation, password visibility toggle,
 * and Google OAuth support. Uses TanStack Form and Zod schema.
 */
export default function SignUpPage() {
  const { signUp, signInWithGoogle, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const signUpSchema = z.object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name too long'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
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
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      try {
        await signUp(value.email, value.password, value.fullName);
        router.push('/auth/sign-in');
      } catch (err) {
        setError((err as Error).message);
      }
    },
  });

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
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    'text-sm font-medium text-neutral-900 placeholder-neutral-700',
                    'h-full w-full rounded-full border py-3 pl-9',
                    field.state.meta.errors.length
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-neutral-500',
                    'focus:border-transparent focus:ring-2 focus:outline-none',
                    'transition-all duration-200'
                  )}
                />
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                  {typeof error === 'string' ? error : error?.message}
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
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    'text-sm font-medium text-neutral-900 placeholder-neutral-700',
                    'h-full w-full rounded-full border py-3 pl-9',
                    field.state.meta.errors.length
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-neutral-500',
                    'focus:border-transparent focus:ring-2 focus:outline-none',
                    'transition-all duration-200'
                  )}
                />
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                  {typeof error === 'string' ? error : error?.message}
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
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    'text-sm font-medium text-neutral-900 placeholder-neutral-700',
                    'h-full w-full rounded-full border py-3 pr-12 pl-9',
                    field.state.meta.errors.length
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-neutral-300 focus:ring-neutral-500',
                    'focus:border-transparent focus:ring-2 focus:outline-none',
                    'transition-all duration-200'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn('absolute top-1/2 right-3 -translate-y-1/2', 'text-neutral-800')}
                >
                  {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                  {typeof error === 'string' ? error : error?.message}
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
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  className="cursor-pointer"
                />
                <label className="ml-2 text-sm font-medium text-neutral-600">
                  I agree to the Gossamer terms and conditions and the privacy policy
                </label>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.map((error, index) => (
                  <p key={index} className="mt-1 ml-2 w-full text-xs text-red-500">
                    {typeof error === 'string' ? error : error?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || form.state.isSubmitting}
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
          {loading || form.state.isSubmitting ? (
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
          onClick={signInWithGoogle}
          disabled={loading}
          className={cn(
            'mt-6 w-full',
            'rounded-full border border-neutral-300',
            'flex items-center justify-center gap-3 py-3',
            'cursor-pointer hover:shadow-lg',
            'active:scale-95',
            'transition-all duration-300',
            'disabled:opacity-50'
          )}
        >
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
        </button>

        {/* Sign In Link */}
        <p className={cn('text-sm text-neutral-500', 'mt-4')}>
          Have an account?{' '}
          <Link href="/auth/sign-in" className="text-sm font-semibold text-nowrap text-neutral-800">
            Sign In
          </Link>
        </p>

        <p className={cn('text-sm leading-6 text-neutral-500', 'mt-6 text-center')}>
          By signing up you agree to our <br />{' '}
          <Link href="#" className="text-sm font-bold text-nowrap text-neutral-800">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-sm font-semibold text-nowrap text-neutral-800">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Right Column (decorative) */}
      <div
        className={cn('hidden md:col-span-5 md:block', 'rounded-2xl bg-neutral-800 p-4 shadow')}
      />
    </form>
  );
}

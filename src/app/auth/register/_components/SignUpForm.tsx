'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeOff, Loader2, Lock, Mail, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import LogoIcon from '@/components/ui/LogoIcon';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';

import { useGoogleLogin, useRegister } from '@/hooks/useAuth';
import { registerSchema } from '@/lib/validator/auth';
import InputField from '@/components/ui/InputField';
import { PasswordField } from '@/components/ui/PasswordField';
import { CheckboxField } from '@/components/ui/CheckboxField';
import SubmitButton from '@/components/ui/SubmitButton';
import { GoogleButton } from '@/components/ui/GoogleButton';

export function SignUpForm() {
  const { mutate: signUp, isPending } = useRegister();
  const { mutate: loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      agree: false,
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      signUp(
        {
          fullName: value.fullName,
          email: value.email,
          password: value.password,
          agree: value.agree,
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
        <p className={cn('text-sm text-neutral-800', 'mt-2 mb-8')}>Are you ready to join us?</p>
        <div className="flex w-full flex-col gap-4">
          <form.Field name="fullName">
            {(field) => (
              <InputField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="Your full name"
                icon={<UserRound className="size-4.5" />}
                type="text"
              />
            )}
          </form.Field>

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
        {/* Full Name */}

        {/* Terms Checkbox */}
        <div className="mt-4 mb-6 flex w-full items-center justify-between">
          <form.Field name="agree">
            {(field) => (
              <CheckboxField
                name={field.name}
                checked={field.state.value}
                onChange={field.handleChange}
                disabled={isLoading}
                label=" I agree to the Gossamer terms and conditions and the privacy policy"
              />
            )}
          </form.Field>
        </div>

        {/* Submit */}
        <SubmitButton title="Sign Up" titleLoading="Signing Up..." isLoading={isLoading} />
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
        className={cn('hidden md:col-span-5 md:block', 'rounded-2xl bg-neutral-800 p-4 shadow')}
      />
    </form>
  );
}

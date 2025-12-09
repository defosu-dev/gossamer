'use client';
import InputField from '@/components/ui/InputField';
import SubmitButton from '@/components/ui/SubmitButton';
import { to } from '@/config/routes';
import { cn } from '@/lib/utils/cn';
import { useForm } from '@tanstack/react-form';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import z from 'zod';

export const contactUsSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must contain at least 2 characters')
    .max(50, 'First name is too long'),

  lastName: z
    .string()
    .min(2, 'Last name must contain at least 2 characters')
    .max(50, 'Last name is too long'),

  email: z.email('Enter a valid email address').trim(),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, 'Enter a valid phone number'),

  message: z
    .string()
    .min(10, 'Message must contain at least 10 characters')
    .max(2000, 'Message is too long'),
});

function ContactUsForm() {
  const [error, setError] = useState<string>('');

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    validators: {
      onSubmit: contactUsSchema,
    },
    onSubmit: (value) => console.log(value),
  });

  const isLoading = form.state.isSubmitting;

  return (
    <form
      action={() => form.handleSubmit()}
      className={cn(
        'my-8 w-full max-w-md min-w-xs flex-1',
        'rounded-3xl border border-neutral-100 p-8 shadow-sm',
        'flex flex-col',
        'bg-white'
      )}
      noValidate
    >
      <h2 className={cn('text-3xl font-bold', 'mt-4')}>Welcome Back</h2>
      <p className={cn('text-sm text-neutral-800', 'mt-2')}>Are you a returning customer?</p>
      <div className="mt-8 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
          <form.Field name="firstName">
            {(field) => (
              <InputField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="First name"
              />
            )}
          </form.Field>
          <form.Field name="lastName">
            {(field) => (
              <InputField
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                placeholder="First name"
              />
            )}
          </form.Field>
        </div>
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
        <form.Field name="phone">
          {(field) => (
            <InputField
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              placeholder="Your phone"
              icon={<Phone className="size-4.5" />}
              type="tel"
            />
          )}
        </form.Field>
        <form.Field name="message">
          {(field) => (
            <InputField
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              placeholder="Tell us what we can help you..."
              textarea
            />
          )}
        </form.Field>
        {/* Submit */}
        <SubmitButton title="Submit" isLoading={isLoading} />
        {error && <p className="mt-2 w-full text-sm text-red-600">{error}</p>}

        <p className={cn('text-sm leading-6 text-neutral-500', 'mt-6 text-center')}>
          By contacting us you agree to our <br />{' '}
          <Link
            href={to.faq()}
            className="text-sm font-bold text-nowrap text-neutral-800 hover:underline"
          >
            Terms of service
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
    </form>
  );
}

export default ContactUsForm;

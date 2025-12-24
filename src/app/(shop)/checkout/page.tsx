'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { Loader2, Mail, MapPin, Phone, UserRound, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

import Container from '@/components/ui/Container';
import InputField from '@/components/ui/InputField';
import SubmitButton from '@/components/ui/SubmitButton';
import { OrderSummary } from './_components/OrderSummary';

import { cn } from '@/lib/utils/cn';
import { useUser } from '@/hooks/user';
import { useCart } from '@/hooks/useCart';
import { initCheckoutSchema } from '@/lib/validator/checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const { items: cartItems, isLoading: isCartLoading } = useCart();
  const [error, setError] = useState<string>('');

  const defaultValues = {
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: initCheckoutSchema,
    },
    onSubmit: async ({ value }) => {
      if (cartItems.length === 0) {
        toast.error('Cart is empty');
        return;
      }
      setError('');

      try {
        const payload = {
          ...value,
          items: user
            ? undefined
            : cartItems.map((i) => ({
                variantId: i.variantId,
                quantity: i.quantity,
              })),
        };

        const res = await fetch('/api/checkout/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Checkout failed');

        const params = new URLSearchParams();
        params.set('client_secret', data.clientSecret);
        router.push(`/checkout/payment?${params.toString()}`);
      } catch (err) {
        console.error(err);
        const msg = err instanceof Error ? err.message : 'Something went wrong';
        setError(msg);
        toast.error(msg);
      }
    },
  });

  useEffect(() => {
    if (user) {
      if (!form.getFieldValue('email')) form.setFieldValue('email', user.email);
      if (!form.getFieldValue('name') && user.name) form.setFieldValue('name', user.name);
      if (!form.getFieldValue('phone') && user.phone) form.setFieldValue('phone', user.phone);
    }
  }, [user, form]);

  if (isUserLoading || isCartLoading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
      </Container>
    );
  }

  return (
    <Container className="flex-col py-10 lg:py-16">
      {/* Page Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-neutral-500">Complete your order details below.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className={cn(
              'overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl shadow-neutral-100/50',
              'flex flex-col'
            )}
            noValidate
          >
            {/* Header Form Section */}
            <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4 lg:px-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                <UserRound className="size-5 text-neutral-500" />
                Contact & Shipping Info
              </h3>
            </div>

            <div className="flex flex-col gap-6 p-6 lg:p-8">
              {/* Grid Layout for Inputs */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Full Name */}
                <form.Field name="name">
                  {(field) => (
                    <div className="md:col-span-1">
                      <InputField
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        placeholder="Full Name"
                        icon={<UserRound className="size-4.5 text-neutral-400" />}
                        autoComplete="name"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Phone */}
                <form.Field name="phone">
                  {(field) => (
                    <div className="md:col-span-1">
                      <InputField
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        placeholder="Phone Number"
                        type="tel"
                        icon={<Phone className="size-4.5 text-neutral-400" />}
                        autoComplete="tel"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Email - Full Width */}
                <form.Field name="email">
                  {(field) => (
                    <div className="md:col-span-2">
                      <InputField
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        placeholder="Email Address"
                        type="email"
                        icon={<Mail className="size-4.5 text-neutral-400" />}
                        autoComplete="email"
                      />
                    </div>
                  )}
                </form.Field>

                {/* Address Divider */}
                <div className="relative py-2 md:col-span-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-neutral-100" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-xs font-medium tracking-wider text-neutral-400 uppercase">
                      Delivery Details
                    </span>
                  </div>
                </div>

                <form.Field name="address">
                  {(field) => (
                    <div className="md:col-span-2">
                      <InputField
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        placeholder="Shipping Address (City, Street, House)"
                        icon={<MapPin className="size-4.5 text-neutral-400" />}
                        autoComplete="shipping street-address"
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <div className="mt-2">
                <SubmitButton
                  title="Continue to Payment"
                  titleLoading="Processing..."
                  isLoading={form.state.isSubmitting}
                />
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
                  <ShieldCheck className="size-3.5" />
                  Secure Checkout
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <OrderSummary />

            <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 text-xs text-neutral-500">
              <p>
                By placing an order, you agree to our Terms of Service and Privacy Policy. We ensure
                secure payment processing via Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

import Container from '@/components/ui/Container';
import { OrderSummary } from '../_components/OrderSummary';

import { cn } from '@/lib/utils/cn';
import { useStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryKeys';
import { to } from '@/config/routes';
import SubmitButton from '@/components/ui/SubmitButton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const stripeAppearance: StripeElementsOptions['appearance'] = {
  theme: 'flat',
  variables: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSizeBase: '14px',
    fontWeightMedium: '500',

    borderRadius: '12px',

    colorPrimary: '#737373',
    colorText: '#171717',
    colorTextPlaceholder: '#404040',
    colorDanger: '#ef4444',
    colorBackground: '#ffffff',
  },
  rules: {
    '.Input': {
      borderRadius: '9999px',
      padding: '12px',
      border: '1px solid #d4d4d4',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    '.Input:focus': {
      border: '1px solid transparent',
      boxShadow: '0 0 0 2px #737373',
    },
    '.Block': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
    },
    '.LinkAuth': {
      borderRadius: '16px',
      padding: '16px',
    },
  },
};

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCart = useStore((s) => s.clearCart);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
      setIsLoading(false);
      return;
    }

    toast.success('Payment successful');

    clearCart();
    await queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    await queryClient.invalidateQueries({ queryKey: queryKeys.orders.list() });

    router.push(to.profile());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'overflow-hidden rounded-2xl border border-neutral-100 bg-white',
        'flex flex-col shadow-xl shadow-neutral-100/50'
      )}
    >
      <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4 lg:px-8">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
          <Lock className="size-5 text-neutral-500" />
          Secure Payment
        </h3>
      </div>

      <div className="flex flex-col gap-6 p-6 lg:p-8">
        <div className="min-h-[220px]">
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>

        <div className="mt-2">
          <SubmitButton isLoading={isLoading} title="Pay Now" titleLoading="Processing..." />

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <ShieldCheck className="size-3.5" />
            Payments are secure and encrypted
          </p>
        </div>
      </div>
    </form>
  );
}

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('client_secret');

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-bold text-neutral-900">Access denied</h2>
        <p className="mt-2 text-neutral-500">Missing payment session. Please restart checkout.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Left */}
      <div className="lg:col-span-7">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: stripeAppearance,
            fonts: [
              {
                cssSrc:
                  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
              },
            ],
          }}
        >
          <PaymentForm />
        </Elements>
      </div>

      {/* Right */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-6">
          <OrderSummary />

          <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 text-xs text-neutral-500">
            <p>
              By placing an order, you agree to our Terms of Service and Privacy Policy. Secure
              payment processing is provided by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
 * Page wrapper
 * ------------------------------------------- */
export default function PaymentPage() {
  return (
    <Container className="flex-col py-10 lg:py-16">
      {/* Page header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Payment
        </h1>
        <p className="mt-2 text-neutral-500">Complete your purchase securely.</p>
      </div>

      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="size-10 animate-spin text-neutral-300" />
          </div>
        }
      >
        <PaymentPageContent />
      </Suspense>
    </Container>
  );
}

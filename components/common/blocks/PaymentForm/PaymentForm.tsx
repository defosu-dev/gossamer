'use client';

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { useAuth } from '@/hooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const FIXED_AMOUNT = 50; // $50.00

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      '::placeholder': { color: '#9ca3af' },
      lineHeight: '1.5',
    },
    invalid: { color: '#dc2626', iconColor: '#dc2626' },
  },
  hidePostalCode: true,
};

/**
 * CheckoutForm.
 *
 * Handles Stripe payment form logic for a fixed amount.
 *
 * @remarks
 * - Requires user to be logged in (`useAuth`).
 * - Uses Stripe Elements and CardElement for secure card input.
 * - Handles errors and success messages with inline alerts.
 * - Shows loading spinner while processing payment.
 * - Amount is fixed in this example but can be parameterized.
 */
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (user == null) {
      setError('You must be logged in to make a payment.');
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setError('Card input is not available. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: FIXED_AMOUNT * 100,
          userId: user.id,
          email: user.email,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Payment intent creation failed');
      }

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setError(result.error.message ?? 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (user == null) {
    return <p className="text-center text-red-500">You must be logged in to pay</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      {/* Amount */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
        <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900">
          ${FIXED_AMOUNT.toFixed(2)}
        </div>
      </div>

      {/* Card input */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Card Details</label>
        <div className="rounded-lg border border-gray-300 bg-white p-4 transition-all focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-200">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Success message */}
      {success && (
        <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
          Payment successful! Thank you!
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${FIXED_AMOUNT.toFixed(2)}`
        )}
      </button>
    </form>
  );
}

/**
 * PaymentForm.
 *
 * Wraps the CheckoutForm with Stripe Elements provider.
 *
 * @remarks
 * - Must be used client-side (`'use client'`).
 * - Stripe public key is read from environment variable.
 */
export default function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryKeys';
import Button from '@/components/ui/Button';

// Ініціалізація Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#dc2626', iconColor: '#dc2626' },
  },
  hidePostalCode: true,
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      toast.error('Not ready');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      // 1. Ініціалізація чекауту (створення замовлення з кошика)
      // Ми відправляємо фейкову адресу для тесту, бо API вимагає валідацію
      const res = await fetch('/api/checkout/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name || 'Test User',
          phone: user.phone || '1234567890',
          address: 'Test Address Line 1',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Initialization failed');
      }

      const { clientSecret } = data;

      // 2. Підтвердження оплати в Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.name ?? undefined,
            email: user.email,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent?.status === 'succeeded') {
        toast.success('Payment successful!');
        queryClient.invalidateQueries({ queryKey: queryKeys.orders.list() });
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
        card.clear();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Test Payment</h3>
        <p className="text-sm text-gray-500">
          This form creates an order from your <strong>current cart</strong> and pays for it.
        </p>
      </div>

      <div className="rounded-lg border border-gray-300 bg-white p-3">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <Button disabled={!stripe || loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay for Cart'
        )}
      </Button>
    </form>
  );
}

export default function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

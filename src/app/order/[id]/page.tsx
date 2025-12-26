'use client';

import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ChevronLeft, Package, MapPin, CreditCard, Calendar } from 'lucide-react';

import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils/cn';
import formatCurrency from '@/lib/utils/formatCurrency';
import { useOrderDetail } from '@/hooks/user';
import { to } from '@/config/routes';

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const searchParams = useSearchParams();
  const emailQuery = searchParams.get('email') || undefined;

  const { data: order, isLoading, error } = useOrderDetail(id, emailQuery);

  if (isLoading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-neutral-50 p-6">
          <Package className="size-10 text-neutral-300" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Order Not Found</h1>
        <p className="mt-2 text-neutral-500">
          The order you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link href={to.home()} className="mt-8 text-sm font-semibold underline">
          Return Home
        </Link>
      </Container>
    );
  }

  return (
    <Container className={cn('flex flex-col py-10')}>
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href={to.profile()}
          className="flex w-fit items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ChevronLeft className="size-4" />
          Back to Orders
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Order #{order.number}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <Calendar className="size-4" />
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        <span
          className={cn(
            'w-fit rounded-full px-4 py-1.5 text-sm font-bold tracking-wide uppercase',
            order.status === 'paid'
              ? 'bg-green-100 text-green-700'
              : order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-neutral-100 text-neutral-600'
          )}
        >
          {order.status}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Items (2 cols wide) */}
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4">
              <h3 className="font-semibold text-neutral-900">Order Items</h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-6">
                  <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
                    <ImageWithFallback
                      src={item.imageUrl ?? ''}
                      alt={item.productTitle}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h4 className="font-medium text-neutral-900">{item.productTitle}</h4>
                      {item.variantName && (
                        <p className="text-sm text-neutral-500">{item.variantName}</p>
                      )}
                      <p className="mt-1 text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="mt-2 text-right sm:mt-0">
                      <p className="font-semibold text-neutral-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-neutral-400">
                          {formatCurrency(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-neutral-900">
              <CreditCard className="size-4 text-neutral-500" />
              Payment Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold text-neutral-900">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Shipping Info (1 col wide) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-neutral-900">
              <MapPin className="size-4 text-neutral-500" />
              Shipping Details
            </h3>

            <div className="space-y-4 text-sm text-neutral-600">
              <div>
                <p className="mb-1 text-xs font-medium tracking-wider text-neutral-400 uppercase">
                  Customer
                </p>
                <p className="font-medium text-neutral-900">{order.shipping.name}</p>
                <p>{order.shipping.email}</p>
                <p>{order.shipping.phone}</p>
              </div>

              <div className="border-t border-neutral-50 pt-4">
                <p className="mb-1 text-xs font-medium tracking-wider text-neutral-400 uppercase">
                  Address
                </p>
                <p className="whitespace-pre-wrap">{order.shipping.address}</p>
              </div>
            </div>
          </div>

          {/* Help Box */}
          <div className="rounded-2xl bg-neutral-900 p-6 text-center text-white">
            <h4 className="mb-2 font-semibold">Need Help?</h4>
            <p className="mb-4 text-sm text-neutral-400">
              Have issues with your order? Contact our support team.
            </p>
            <Link href={to.faq()} className="text-sm font-semibold hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

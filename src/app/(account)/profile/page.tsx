'use client';

import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import { Loader2 } from 'lucide-react';

import { useUser } from '@/hooks/user';
import { ProfileForm } from './_components/ProfileForm';
import { AddressList } from './_components/AddressList';
import PaymentHistory from './_components/PaymentHistory';

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Container className="flex justify-center py-32">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Access Denied</h1>
        <p className="mt-2 text-neutral-500">Please log in to view your profile.</p>
      </Container>
    );
  }

  return (
    <Container className={cn('flex flex-col gap-10 py-10')}>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          My Account
        </h1>
        <p className="mt-2 text-neutral-500">Manage your profile, addresses and orders.</p>
      </div>

      <div className="grid w-full gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Settings (Sticky) */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
          <ProfileForm />
          <AddressList />
        </div>

        {/* Right Column: Orders */}
        <div className="lg:col-span-8">
          <PaymentHistory />
        </div>
      </div>
    </Container>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import { Loader2 } from 'lucide-react';

import { useUser } from '@/hooks/user';
import { ProfileForm } from './_components/ProfileForm';
import { AddressList } from './_components/AddressList';
import PaymentHistory from './_components/PaymentHistory/PaymentHistory';

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const searchParams = useSearchParams();

  const activeSection = searchParams.get('section');

  if (isLoading) {
    return (
      <Container className="flex justify-center py-20">
        <Loader2 className="size-8 animate-spin text-neutral-300" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-neutral-500">Please log in to view your profile.</p>
      </Container>
    );
  }

  return (
    <Container className={cn('flex flex-col gap-10 py-10 lg:py-16')}>
      <div className="border-b border-neutral-100 pb-8">
        <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
        <p className="mt-2 text-neutral-500">Manage your profile, addresses and orders.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Settings */}
        <div className="space-y-8 lg:col-span-4">
          <ProfileForm />
          <AddressList />
        </div>

        {/* Right Column: Orders (Wider) */}
        <div className="lg:col-span-8">
          <PaymentHistory />
        </div>
      </div>
    </Container>
  );
}

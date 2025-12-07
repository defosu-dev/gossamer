'use client';

import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import PaymentForm from './_components/PaymentForm/PaymentForm';
import PaymentHistory from './_components/PaymentHistory/PaymentHistory';
import { useUser } from '@/hooks/user';

export default function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Container className="py-10 text-center">Loading profile...</Container>;
  }

  if (!user) {
    return <Container className="py-10 text-center">Please log in to view your profile.</Container>;
  }

  return (
    <Container className={cn('flex flex-col gap-10 py-10')}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <PaymentForm />
        </div>

        <div>
          <PaymentHistory />
        </div>
      </div>
    </Container>
  );
}

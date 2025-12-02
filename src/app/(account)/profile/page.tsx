import { cn } from '@/lib/utils/cn';
import PaymentForm from './_components/PaymentForm/PaymentForm';
import PaymentHistory from './_components/PaymentHistory/PaymentHistory';
import Container from '@/components/ui/Container';

/**
 * @remarks
 * Server page component for the user profile.
 * Renders the profile header, payment form, and payment history.
 */
export default function ProfilePage() {
  return (
    <Container xCenter className={cn('flex-col')}>
      <h1>Profile</h1>
      <PaymentForm />
      <br />
      <PaymentHistory />
    </Container>
  );
}

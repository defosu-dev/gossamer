import { cn } from '@/utils/cn';
import PaymentHistory from '@/components/common/blocks/PaymentHistory/PaymentHistory';
import Container from '@/components/common/Container';
import PaymentForm from '@/components/common/blocks/PaymentForm/PaymentForm';

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

import Container from '@/components/ui/Container';
import dynamic from 'next/dynamic';
import ContactUsFormSkeleton from './_components/ContactUsForm/ContactUsFormSkeleton';
import type { Metadata } from 'next';

const ContactUsForm = dynamic(() => import('./_components/ContactUsForm/ContactsUsForm'), {
  loading: () => <ContactUsFormSkeleton />,
});

export const metadata: Metadata = {
  title: 'Constact Us | Gossamer',
  description: 'You can reach us anytime',
};

function ContactUsPage() {
  return (
    <Container xCenter justifyContent="center" alignItems="center">
      <ContactUsForm />
    </Container>
  );
}

export default ContactUsPage;

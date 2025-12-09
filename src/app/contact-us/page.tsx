import Container from '@/components/ui/Container';
import dynamic from 'next/dynamic';

const ContactUsForm = dynamic(() => import('./_components/ContactUsForm/ContactsUsForm'));

function ContactUsPage() {
  return (
    <Container xCenter justifyContent="center" alignItems="center">
      <ContactUsForm />
    </Container>
  );
}

export default ContactUsPage;

import Container from '@/components/ui/Container';
import ContactUsFormSkeleton from './_components/ContactUsForm/ContactUsFormSkeleton';

function LoadingContactUs() {
  return (
    <Container xCenter justifyContent="center" alignItems="center">
      <ContactUsFormSkeleton />
    </Container>
  );
}

export default LoadingContactUs;

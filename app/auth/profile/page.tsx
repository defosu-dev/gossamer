import PaymentHistory from '@/components/common/blocks/PaymentHistory/PaymentHistory';
import Container from '@/components/common/Container';
import PaymentForm from '../../../components/common/blocks/PaymentForm/PaymentForm';

const page = () => {
  return (
    <Container xCenter className="flex-col">
      <h1>Profile</h1>
      <PaymentForm />
      <br />
      <PaymentHistory />
    </Container>
  );
};

export default page;

import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';

interface AuthLayout {
  children: React.ReactNode;
}

/**
 * @remarks
 * Auth layout component centers its children using Container.
 */
export default function AuthLayout({ children }: AuthLayout) {
  return (
    <Container justifyContent="center" alignItems="center" className={cn('py-10')}>
      {children}
    </Container>
  );
}

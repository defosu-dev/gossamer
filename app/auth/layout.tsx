import { cn } from '@/utils/cn';
import Container from '@/components/common/Container';
import { type ILayout } from '@/types/ILayout';

/**
 * @remarks
 * Auth layout component centers its children using Container.
 */
export default function AuthLayout({ children }: ILayout) {
  return (
    <Container justifyContent="center" alignItems="center" className={cn('py-10')}>
      {children}
    </Container>
  );
}

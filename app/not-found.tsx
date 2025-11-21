import Link from 'next/link';

import { cn } from '@/utils/cn';
import Container from '@/components/common/Container';

/**
 * @remarks
 * Custom 404 Not Found page for the Next.js App Router.
 * Renders a user-friendly error message with a link to return home.
 */
export function NotFound() {
  return (
    <Container
      alignItems="center"
      justifyContent="center"
      xCenter={true}
      className={cn('py-16 text-gray-800')}
    >
      <div className={cn('animate-fade-in space-y-6 text-center')}>
        <h1 className={cn('text-6xl font-bold tracking-tight')}>404</h1>
        <h2 className={cn('text-2xl font-semibold')}>Page Not Found in Gossamer</h2>
        <p className={cn('max-w-md text-gray-600')}>
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className={cn(
            'inline-block rounded-md bg-neutral-800 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-neutral-700 focus:outline-none'
          )}
          aria-label="Return to homepage"
        >
          Go Back Home
        </Link>
      </div>
    </Container>
  );
}

export default NotFound;

import Link from 'next/link';
import Container from '@/components/common/Container';

/**
 * Custom 404 Not Found page for the Next.js App Router.
 * Renders a user-friendly error message with a link to return home.
 */
const NotFound = () => {
  return (
    <Container
      alignItems="center"
      justifyContent="center"
      xCenter={true}
      className="py-16 text-gray-800"
    >
      <div className="animate-fade-in space-y-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found in Gossamer</h2>
        <p className="max-w-md text-gray-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-neutral-800 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-neutral-700 focus:outline-none"
          aria-label="Return to homepage"
        >
          Go Back Home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;

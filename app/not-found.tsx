import Link from "next/link";
import Container from "@/components/common/Container";

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
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold">
          Page Not Found in Gossamer
        </h2>
        <p className="text-gray-600 max-w-md">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-neutral-800 text-white font-medium rounded-md hover:bg-neutral-700 transition-all duration-300 focus:outline-none "
          aria-label="Return to homepage"
        >
          Go Back Home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
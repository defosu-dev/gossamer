import { type ReactNode } from 'react';

interface NewArrivalDescriptionProps {

  /** Description text content */
  children: ReactNode;
}

/**
 * NewArrivalDescription.
 *
 * Renders the product description text for the NewArrival section.
 *
 * @remarks
 * Pure presentational component with consistent typography and spacing.
 */
export function NewArrivalDescription({ children }: NewArrivalDescriptionProps) {
  return <p className="mb-8 leading-relaxed text-gray-500">{children}</p>;
}

export default NewArrivalDescription;

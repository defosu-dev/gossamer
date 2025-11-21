import { type ReactNode } from 'react';

interface NewArrivalTitleProps {
  /** Title text content */
  children: ReactNode;
}

/**
 * NewArrivalTitle.
 *
 * Large heading used in the NewArrival promotional section.
 *
 * @remarks
 * Pure presentational component with bold, large typography.
 */
export function NewArrivalTitle({ children }: NewArrivalTitleProps) {
  return <h1 className="mb-4 text-5xl font-bold">{children}</h1>;
}

export default NewArrivalTitle;

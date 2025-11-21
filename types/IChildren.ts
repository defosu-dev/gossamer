import type { ReactNode } from 'react';

/**
 * @remarks
 * Base interface for components that accept `children`.
 */
export interface IChildren {

  /** Child nodes rendered inside the component */
  children: ReactNode;
}

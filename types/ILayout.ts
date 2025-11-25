import type { ReactNode } from 'react';

/**
 * @remarks
 * Base interface for layout components that wrap page content.
 */
export interface ILayout {
  /** Content rendered inside the layout */
  children: ReactNode;
}

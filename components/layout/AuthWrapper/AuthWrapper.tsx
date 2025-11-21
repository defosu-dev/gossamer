import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface AuthWrapperProps {

  /** Content to render inside the wrapper */
  children: ReactNode;
}

/**
 * @remarks
 * A simple wrapper component for authentication-related UI.
 * - Renders children inside a container div.
 */
export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className={cn('')}>
      <div>{children}</div>
    </div>
  );
}

export default AuthWrapper;

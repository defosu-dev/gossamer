'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
  /** Application subtree that needs access to React Query */
  children: ReactNode;
}

/**
 * QueryProvider.
 *
 * Global React Query provider with shared QueryClient instance.
 *
 * @remarks
 * Client component required due to useState usage for stable client instance.
 * Configures default staleTime = 5 min and single retry for all queries.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;

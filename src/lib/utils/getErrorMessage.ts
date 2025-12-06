import type { ApiError } from '@/types/api';

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'error' in error) {
    return (error as ApiError).error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
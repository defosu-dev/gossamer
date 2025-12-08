export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'error' in error) {
    const errData = (error as { error: unknown }).error;

    if (Array.isArray(errData)) {
      const firstError = errData[0];
      
      if (typeof firstError === 'object' && firstError !== null && 'message' in firstError) {
        return String((firstError as { message: unknown }).message);
      }
      
      if (typeof firstError === 'string') {
        return firstError;
      }

      return 'Validation error';
    }

    if (typeof errData === 'string') {
      return errData;
    }

    return String(errData);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}
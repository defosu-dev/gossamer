'use client';

import { useRef, useCallback, useEffect } from 'react';

/**
 * Hook: Debounces a callback that accepts a single `number`.
 *
 * @remarks
 * Client-side only hook. Useful for quantity inputs, price sliders, etc.
 * Guarantees the latest callback is always called and clears timeout on unmount.
 *
 * @param cb Callback to debounce.
 * @param delay Delay in milliseconds (default 300).
 * @returns Debounced function.
 */
export function useDebouncedCallback<T extends (qty: number) => void>(
  cb: T,
  delay = 300
): (qty: number) => void {
  const timer = useRef<number | null>(null);
  const cbRef = useRef(cb);

  // Keep callback reference up-to-date
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const call = useCallback(
    (qty: number) => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        cbRef.current(qty);
        timer.current = null;
      }, delay);
    },
    [delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  return call;
}

export default useDebouncedCallback;

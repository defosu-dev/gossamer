import { useRef, useCallback, useEffect } from "react";

/**
 * Hook: Debounces a callback that accepts a single `number`.
 *
 * @template T - `(qty: number) => void`
 * @param {T} cb - Callback to debounce.
 * @param {number} [delay=300] - Delay in ms.
 * @returns {(qty: number) => void} - Debounced function.
 */
const useDebouncedCallback = <T extends (qty: number) => void>(
  cb: T,
  delay = 300
): ((qty: number) => void) => {
  const timer = useRef<number | null>(null);
  const cbRef = useRef(cb);
  cbRef.current = cb;

  const call = useCallback(
    (qty: number) => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        cbRef.current(qty);
        timer.current = null;
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  return call;
};

export default useDebouncedCallback;

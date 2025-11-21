import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines `clsx` and `twMerge` for conditional Tailwind class strings.
 *
 * @remarks
 * - Handles conditional classes via `clsx`
 * - Removes duplicates and resolves conflicting Tailwind classes via `twMerge`
 * - Standard utility used throughout the project
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

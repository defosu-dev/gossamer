import { cn } from '@/utils/cn';

interface DarkBackgroundProps {
  /** Whether the backdrop is visible */
  open: boolean;

  /** Callback triggered when the backdrop is clicked */
  onClose: () => void;
}

/**
 * Semi-transparent backdrop used behind modals or dropdowns.
 *
 * @remarks
 * Covers the entire viewport and closes the parent component when clicked.
 * Uses smooth opacity transition and disables pointer events when hidden.
 */
function DarkBackground({ open, onClose }: DarkBackgroundProps) {
  return (
    <div
      role="presentation"
      className={cn(
        'fixed inset-0 z-40 bg-black/30',
        'transition-opacity duration-300',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onClose}
      aria-hidden={!open}
    />
  );
}

export default DarkBackground;

import { cn } from '@/utils/cn';

type DarkBackgroundProps = {
  /** Whether the backdrop is visible */
  open: boolean;

  /**
   * Called when user clicks the backdrop.
   * Typically closes the parent modal/dropdown.
   */
  onClose: () => void;
};

/**
 * Semi-transparent backdrop used behind modals or dropdowns.
 *
 * @component
 * @accessibility
 * - Uses `aria-hidden` to indicate its visibility.
 * - Does not trap focus; only closes on click.
 */
const DarkBackground = ({ open, onClose }: DarkBackgroundProps) => {
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
};

export default DarkBackground;

import { cn } from '@/lib/utils/cn';
import { Loader2, Search } from 'lucide-react';

export interface SearchButtonProps {
  open: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

function SearchButton({ open, onClick, isLoading }: SearchButtonProps) {
  return (
    <button
      aria-haspopup="menu"
      aria-expanded={open}
      aria-label={isLoading ? 'Loading search' : 'Open search'}
      onClick={onClick}
      type="button"
      disabled={isLoading}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-full',
        'border border-neutral-300 bg-white shadow-sm',
        'transition-all hover:bg-neutral-50 active:scale-95 active:shadow-inner',
        'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none',
        isLoading && 'cursor-not-allowed opacity-70'
      )}
    >
      {isLoading ? (
        <Loader2 className="size-4.5 animate-spin text-neutral-500" />
      ) : (
        <Search size={20} strokeWidth={2} className="size-4.5 text-gray-700" />
      )}
    </button>
  );
}
export default SearchButton;

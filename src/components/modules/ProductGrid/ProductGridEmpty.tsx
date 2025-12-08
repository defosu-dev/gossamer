import { SearchX } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import Button from '@/components/ui/Button';

interface ProductGridEmptyProps {
  title?: string;

  message?: string;

  onReset?: () => void;

  className?: string;
}

export function ProductGridEmpty({
  title = 'No products found',
  message = 'Try adjusting your search or filters to find what you are looking for.',
  onReset,
  className,
}: ProductGridEmptyProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center py-24 text-center',
        'animate-in fade-in zoom-in-95 duration-300',
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <SearchX className="size-8 text-neutral-400" />
      </div>

      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm text-neutral-500">{message}</p>

      {onReset && (
        <Button onClick={onReset} className="mt-6">
          Repeat
        </Button>
      )}
    </div>
  );
}

export default ProductGridEmpty;

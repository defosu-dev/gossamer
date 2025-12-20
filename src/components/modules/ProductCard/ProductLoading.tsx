import { cn } from '@/lib/utils/cn';

interface ProductLoading {
  className?: string;
}

function ProductLoading({ className = '' }: ProductLoading) {
  return (
    <div
      className={cn(
        'flex max-w-sm animate-pulse flex-col overflow-hidden rounded-lg bg-white',
        className
      )}
    >
      <div className="relative p-1">
        <div className="aspect-square w-full rounded-lg bg-gray-200" />
      </div>
      <div className="flex flex-grow flex-col space-y-3 p-4">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="flex items-end justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-6 w-1/3 rounded bg-gray-200" />
        </div>
        <div className="mt-auto flex gap-2 pt-4">
          <div className="h-10 w-full rounded bg-gray-200" />
          <div className="h-10 w-full rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default ProductLoading;

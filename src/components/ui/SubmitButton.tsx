import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

function SubmitButton({
  isLoading,
  title,
  titleLoading,
}: {
  isLoading: boolean;
  title: string;
  titleLoading?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 font-semibold text-white',
        'transition-all duration-200 hover:shadow-lg active:scale-95',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" /> {titleLoading ? titleLoading : title}
        </>
      ) : (
        title
      )}
    </button>
  );
}

export default SubmitButton;

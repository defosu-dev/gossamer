'use client';

import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

function SearchInput({ value, onChange, onClear, isLoading }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        'flex h-12 w-full items-center overflow-hidden rounded-full border border-neutral-300 bg-neutral-50 p-1 shadow-sm transition-all focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900'
      )}
    >
      <Search className={cn('mr-2 ml-3 h-5 w-5 text-neutral-400')} />

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search products..."
        className={cn(
          'flex-1 bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500'
        )}
      />

      {value && (
        <button
          onClick={onClear}
          className="mr-2 rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <Button variant="primary" className="h-full rounded-full px-6" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
}

export default SearchInput;

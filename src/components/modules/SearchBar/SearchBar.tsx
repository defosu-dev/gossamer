'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface SearchBarProps {
  className?: string;
}

/**
 * @remarks
 * Renders a search bar.
 * - Supports query input and navigation to search results.
 */
export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <Container
      className={cn(
        'flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <h2 className={cn('text-3xl font-bold tracking-tight')}>Give All You Need</h2>

      <div
        className={cn(
          'flex h-10 w-full items-center overflow-hidden rounded-full border border-neutral-300 shadow-sm md:w-[360px]'
        )}
      >
        <Search className={cn('ml-4 h-5 w-5 text-neutral-500')} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search on Gossamer"
          className={cn('flex-1 px-3 text-sm outline-none placeholder:text-neutral-400')}
        />
        <Button
          variant="primary"
          onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
        >
          Search
        </Button>
      </div>
    </Container>
  );
}

export default SearchBar;

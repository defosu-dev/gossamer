'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface SearchBarProps {
  /** Заголовок слева */
  title?: string;
  className?: string;
}

/**
 * @remarks
 * Universal search bar component.
 * - Supports custom title
 * - Supports query input and navigation to search results
 */
export function SearchBar({ title = 'Give All You Need', className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <Container
      className={cn(
        'flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

      <div className="flex h-11 w-full items-center overflow-hidden rounded-full border border-neutral-300 p-0.5 shadow-sm md:w-[360px]">
        <Search className="ml-4 h-5 w-5 text-neutral-500" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search on Gossamer"
          className="flex-1 px-3 text-sm outline-none placeholder:text-neutral-400"
        />

        <Button
          variant="primary"
          onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
          className="flex h-full items-center"
        >
          Search
        </Button>
      </div>
    </Container>
  );
}

export default SearchBar;

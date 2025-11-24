'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import { cn } from '@/utils/cn';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

const categories = ['All', 'Home', 'Music', 'Phone', 'Storage', 'Other'];

/**
 * @remarks
 * Renders a search bar with category filters.
 * - Supports query input and navigation to search results.
 * - Includes category selection buttons and "See All Products" button.
 */
export function SearchBar() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <Container className={cn('flex flex-col')}>
      <div
        className={cn(
          'mt-5 flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between'
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
            onClick={() =>
              router.push(
                `/search?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(activeCategory)}`
              )
            }
          >
            Search
          </Button>
        </div>
      </div>

      <div className={cn('mt-8 flex w-full flex-wrap items-center justify-between gap-4')}>
        <div className={cn('flex flex-wrap gap-3')}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'primary' : 'secondary'}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <Button variant="secondary" onClick={() => router.push('/products')}>
          See All Products
        </Button>
      </div>
    </Container>
  );
}

export default SearchBar;

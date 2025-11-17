'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import Container from '@/components/common/Container';

const categories = ['All', 'Home', 'Music', 'Phone', 'Storage', 'Other'];

const SearchBar = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const router = useRouter();

  return (
    <Container className="flex flex-col">
      <div className="mt-5 flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Give All You Need</h2>

        <div className="flex h-10 w-full items-center overflow-hidden rounded-full border border-neutral-300 shadow-sm md:w-[360px]">
          <Search className="ml-4 h-5 w-5 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search on Gossamer"
            className="flex-1 px-3 text-sm outline-none placeholder:text-neutral-400"
          />
          {/* переход на поиск */}
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

      <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
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

        {/* переход на все продукты */}
        <Button variant="secondary" onClick={() => router.push('/products')}>
          See All Products
        </Button>
      </div>
    </Container>
  );
};

export default SearchBar;

'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import { CategoryCard } from '@/app/_components/ExploreCurated/CategoryCard';
import { cn } from '@/lib/utils/cn';
import type { CategoryDTO } from '@/types/api';

interface CategorySliderProps {
  categories: CategoryDTO[];
}

function Slider({ categories }: CategorySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 504;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  if (!categories || categories.length === 0) return null;

  return (
    <div>
      <div className={cn('mb-8 flex items-center justify-between')}>
        <h2 className={cn('text-2xl leading-tight font-bold md:text-3xl')}>
          Explore our curated categories <br /> and transform your living spaces
        </h2>
        <div className={cn('flex gap-2')}>
          <button
            type="button"
            onClick={() => scroll('left')}
            className={cn('rounded-full bg-gray-100 p-2 transition hover:bg-gray-200')}
            aria-label="Scroll left"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={cn('rounded-full bg-gray-100 p-2 transition hover:bg-gray-200')}
            aria-label="Scroll right"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={sliderRef}
        className={cn('flex gap-6 overflow-x-auto scroll-smooth')}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}

export default Slider;

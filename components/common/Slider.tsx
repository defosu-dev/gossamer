'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import { cn } from '@/utils/cn';

import CategoryCard, {
  type CategoryCardProps,
} from '../pages/home/sections/explorecurated/CategoryCard';

interface CategorySliderProps {

  /** Array of categories to display */
  categories: CategoryCardProps[];
}

/**
 * Slider.
 *
 * Horizontal scrollable slider for category cards with left/right controls.
 *
 * @remarks
 * - Uses `ref` to scroll container smoothly.
 * - Arrow buttons scroll by fixed card width.
 * - Fully responsive flex layout.
 * - Supports any number of categories.
 */
function Slider({ categories }: CategorySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

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
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={cn('rounded-full bg-gray-100 p-2 transition hover:bg-gray-200')}
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div ref={sliderRef} className={cn('flex gap-6 overflow-x-hidden scroll-smooth')}>
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} />
        ))}
      </div>
    </div>
  );
}

export default Slider;

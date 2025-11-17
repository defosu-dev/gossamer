'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CategoryCard, { Category } from '../pages/home/sections/explorecurated/CategoryCard';

type CategorySliderProps = {
  categories: Category[];
};

const Slider = ({ categories }: CategorySliderProps) => {
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
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl leading-tight font-bold md:text-3xl">
          Explore our curated categories <br /> and transform your living spaces
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div ref={sliderRef} className="flex gap-6 overflow-x-hidden scroll-smooth">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} />
        ))}
      </div>
    </div>
  );
};

export default Slider;

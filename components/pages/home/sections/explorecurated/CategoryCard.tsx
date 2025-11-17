import React from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

export type Category = {
  label: string;
  image: string;
};

const CategoryCard = ({ image, label }: Category) => {
  return (
    <div className="group relative h-110 w-120 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border shadow-md">
      <ImageWithFallback src={image} alt={label} />
      <div className="absolute bottom-3 left-3">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">{label}</span>
      </div>
    </div>
  );
};

export default CategoryCard;

import React from 'react';

import { ImageWithFallback } from '@/components/common/ImageWithFallback';
type ImageBlockProps = {
  src: string;
  alt: string;
};
const ProductGallery = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      {/* Main image */}
      <div className="relative mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-white">
        <ImageWithFallback
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="object-contain"
        />
        <span className="absolute top-3 right-3 rounded-full border bg-white px-3 py-1 text-sm text-gray-700">
          Music
        </span>
      </div>

      {/* картинки */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-300 p-1 transition hover:border-gray-500"
          >
            <ImageWithFallback
              src="/img/placeholder.png" // заглушка
              alt={`Placeholder ${i}`}
              width={70}
              height={70}
              className="rounded-lg object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

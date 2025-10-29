import React from "react";

import { ImageWithFallback } from "@/components/common/ImageWithFallback";
type ImageBlockProps = {
  src: string;
  alt: string;
};
const ProductGallery = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      {/* Main image */}
      <div className="relative bg-white rounded-2xl overflow-hidden mb-4 flex justify-center items-center">
        <ImageWithFallback
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="object-contain"
        />
        <span className="absolute top-3 right-3 bg-white border text-gray-700 text-sm px-3 py-1 rounded-full">
          Music
        </span>
      </div>

      {/* картинки */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-300 hover:border-gray-500 transition p-1"
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

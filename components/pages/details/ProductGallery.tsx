import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface ProductGalleryProps {
  /** URL of the main product image */
  src: string;

  /** Alt text for the main image */
  alt: string;
}

/**
 * Product image gallery with main image and thumbnail previews.
 *
 * @remarks
 * Displays a large primary image with category badge and a row of thumbnail
 * placeholders below. Designed for product detail pages.
 */
export function ProductGallery({ src, alt }: ProductGalleryProps) {
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

      {/* Thumbnails */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-300 p-1 transition hover:border-gray-500"
          >
            <ImageWithFallback
              src="/img/placeholder.png"
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
}

export default ProductGallery;

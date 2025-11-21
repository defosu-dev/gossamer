import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface ProductImageProps {

  /** Image URL */
  src: string;

  /** Alt text for accessibility */
  alt: string;

  /** Set true for LCP images to improve performance */
  priority?: boolean;
}

/**
 * @remarks
 * Renders a product image with fallback support.
 * Wraps ImageWithFallback and ensures proper aspect ratio and rounding.
 */
export function ProductImage({ src, alt, priority = false }: ProductImageProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <ImageWithFallback
        src={src}
        alt={alt}
        sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
        priority={priority}
        iconSize={6}
      />
    </div>
  );
}

export default ProductImage;

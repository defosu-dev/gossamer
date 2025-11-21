import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface ImageBlockProps {
  /** Image source URL */
  src: string;

  /** Alt text for accessibility */
  alt: string;
}

/**
 * ImageBlock.
 *
 * Simple responsive image container with fallback support.
 *
 * @remarks
 * Pure presentational component used for displaying product or category images.
 * Includes rounded corners, shadow and loading fallback via ImageWithFallback.
 */
export function ImageBlock({ src, alt }: ImageBlockProps) {
  return (
    <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-200 shadow-lg">
      <ImageWithFallback src={src} alt={alt} />
    </div>
  );
}

export default ImageBlock;

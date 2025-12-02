import ImageWithFallback, { type ImageWithFallbackProps } from '@/components/ui/ImageWithFallback';

interface ImageBlockProps extends Pick<ImageWithFallbackProps, 'src' | 'alt'> {}

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
      <ImageWithFallback src={src} alt={alt} iconSize={10} />
    </div>
  );
}

export default ImageBlock;

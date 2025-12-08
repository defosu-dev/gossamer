import ImageWithFallback, { type ImageWithFallbackProps } from '@/components/ui/ImageWithFallback';

/**
 *
 */
export interface CategoryCardProps extends Pick<ImageWithFallbackProps, 'src' | 'alt'> {}

/**
 * Category card with background image and overlay label.
 *
 * @remarks
 * Pure presentational component used in horizontal scrollable lists
 * or grids. Supports hover states via Tailwind group classes.
 */
export function CategoryCard({ src, alt }: CategoryCardProps) {
  return (
    <div className="group relative h-110 w-120 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border shadow-md">
      <ImageWithFallback src={src} alt={alt} iconSize={10} />
      <div className="absolute bottom-3 left-3">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">{alt}</span>
      </div>
    </div>
  );
}

export default CategoryCard;

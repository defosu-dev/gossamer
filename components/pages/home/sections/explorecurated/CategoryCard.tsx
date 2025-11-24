import { ImageWithFallback } from '@/components/common/ImageWithFallback';

/**
 *
 */
export interface CategoryCardProps {
  /** URL of the category image */
  image: string;

  /** Category label displayed in the overlay */
  label: string;
}

/**
 * Category card with background image and overlay label.
 *
 * @remarks
 * Pure presentational component used in horizontal scrollable lists
 * or grids. Supports hover states via Tailwind group classes.
 */
export function CategoryCard({ image, label }: CategoryCardProps) {
  return (
    <div className="group relative h-110 w-120 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border shadow-md">
      <ImageWithFallback src={image} alt={label} />
      <div className="absolute bottom-3 left-3">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">{label}</span>
      </div>
    </div>
  );
}

export default CategoryCard;

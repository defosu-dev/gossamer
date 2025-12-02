import Title from './NewArrivalTitle';
import Description from './NewArrivalDescription';
import FeatureList from './FeatureList';
import ImageBlock from './ImageBlock';
import { type FeatureItemProps } from './FeatureItem';
import Button from '@/components/ui/Button';
import type { ImageWithFallbackProps } from '@/components/ui/ImageWithFallback';

interface NewArrivalProps {
  /** Optional badge label above the title */
  label?: string;

  /** Main product title */
  title: string;

  /** Product description text */
  description: string;

  /** List of feature items with icon and text */
  features: FeatureItemProps[];

  /** Image object for the product */
  image: Pick<ImageWithFallbackProps, 'src' | 'alt'>;
}

/**
 * NewArrival section showcasing a highlighted product with title,
 * description, feature list and large image.
 *
 * @remarks
 * Responsive two-column layout (stacked on mobile). Pure presentational
 * component used on the homepage and category pages.
 */
export function NewArrival({
  label = 'NEW ARRIVAL',
  title,
  description,
  features,
  image,
}: NewArrivalProps) {
  return (
    <section className="container mx-auto flex max-w-7xl items-center justify-between gap-8 p-1">
      {/* Content left */}
      <div className="mx-auto flex max-w-lg flex-col px-6">
        <span className="mb-2 text-xs font-semibold text-zinc-600">{label}</span>
        <div className="cursor-pointer">
          <Title>{title}</Title>
        </div>
        <Description>{description}</Description>
        <FeatureList items={features} />
        <div className="flex justify-end">
          <Button variant="primary">Details</Button>
        </div>
      </div>

      {/* Image right */}
      <div className="h-[460px] flex-1">
        <ImageBlock src={image.src} alt={image.alt} />
      </div>
    </section>
  );
}

export default NewArrival;

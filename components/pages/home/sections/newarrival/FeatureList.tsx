import FeatureItem, { type FeatureItemProps } from './FeatureItem';

interface FeatureListProps {
  /** Array of feature items to display */
  items: FeatureItemProps[];
}

/**
 * FeatureList.
 *
 * Renders a vertical list of feature items with icons.
 *
 * @remarks
 * Pure presentational component. Accepts an array of objects containing
 * icon name and description text. Typically used in product details.
 */
export function FeatureList({ items }: FeatureListProps) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((feature, idx) => (
        <FeatureItem key={idx} icon={feature.icon} text={feature.text} />
      ))}
    </div>
  );
}

export default FeatureList;

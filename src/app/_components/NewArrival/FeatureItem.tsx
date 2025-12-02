import * as Icons from 'lucide-react';
import { type ComponentType } from 'react';

/**
 *
 */
export interface FeatureItemProps {
  /** Name of the Lucide icon (e.g. "Check", "Shield", "Truck") */
  icon: keyof typeof Icons;

  /** Feature description text */
  text: string;
}

/**
 * Feature item with a dynamic Lucide icon and accompanying text.
 *
 * @remarks
 * Renders a single feature line using a string-based icon name.
 * Icon is resolved at runtime from the lucide-react package.
 */
export function FeatureItem({ icon, text }: FeatureItemProps) {
  const LucideIcon = Icons[icon] as ComponentType<{ className?: string }> | undefined;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {LucideIcon && <LucideIcon className="size-5 text-gray-700" />}
        <span className="text-sm text-gray-600">{text}</span>
      </div>
    </div>
  );
}

export default FeatureItem;

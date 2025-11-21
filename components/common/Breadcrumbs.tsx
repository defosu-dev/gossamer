'use client';

import Link from 'next/link';
import { memo } from 'react';

/**
 * Props for Breadcrumbs component.
 */
export interface BreadcrumbsProps {

  /** Array of breadcrumb items with label and navigation link */
  items: { label: string; href: string }[];
}

/**
 * Breadcrumbs component.
 *
 * Shows a navigation path for the user, highlighting the current page
 * and providing links to ancestor pages.
 *
 * @remarks
 * - Uses `nav` with `aria-label="breadcrumb"` for accessibility.
 * - The last breadcrumb is bold and not followed by a separator.
 * - Separator is `/` with spacing.
 * - Responsive design works for mobile and desktop.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="mt-4">
      <ol className="flex items-center gap-1">
        {items.map((crumb, index) => (
          <li key={`${index}-${crumb.label}`} className="text-sm font-medium text-neutral-600">
            <Link
              href={crumb.href}
              className={index === items.length - 1 ? 'font-bold text-neutral-900' : ''}
            >
              {crumb.label}
            </Link>
            {index < items.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default memo(Breadcrumbs);

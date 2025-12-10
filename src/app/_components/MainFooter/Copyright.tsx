import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { to } from '@/config/routes';

/**
 * @remarks
 * Renders the copyright section with links to Terms of Service and Privacy Policy.
 * - Flex layout adjusts between column (mobile) and row (md breakpoint).
 * - Styled with border-top, padding, and text-sm.
 */
export function Copyright() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between border-t px-4 py-4 text-sm text-zinc-400 md:flex-row md:px-16'
      )}
    >
      <span>Copyright © 2025 Grandexh-Defosu. All Rights Reserved.</span>
      <div className={cn('mt-2 flex gap-4 md:mt-0')}>
        <Link href={to.faq()} className={cn('transition hover:text-black')}>
          Terms of Service
        </Link>
        <Link href={to.faq()} className={cn('transition hover:text-black')}>
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default Copyright;

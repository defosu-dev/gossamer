import { Gem } from 'lucide-react';

import type { IIcon } from '@/types/IIcon';
import { cn } from '@/utils/cn';

/**
 * LogoIcon.
 *
 * Simple reusable logo icon component.
 *
 * @remarks
 * - Uses Lucide `Gem` icon.
 * - Size and color can be customized via `className`.
 */
function LogoIcon({ className }: IIcon) {
  return <Gem className={cn('size-6 text-black', className)} />;
}

export default LogoIcon;

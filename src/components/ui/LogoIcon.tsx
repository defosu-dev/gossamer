import { Gem } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

interface LogoIconProps {
  className?: string;
}
/**
 * LogoIcon.
 *
 * Simple reusable logo icon component.
 *
 * @remarks
 * - Uses Lucide `Gem` icon.
 * - Size and color can be customized via `className`.
 */
function LogoIcon({ className }: LogoIconProps) {
  return <Gem className={cn('size-6 text-black', className)} />;
}

export default LogoIcon;

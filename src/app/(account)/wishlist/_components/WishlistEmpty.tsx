import Link from 'next/link';
import { Heart } from 'lucide-react';
import { to } from '@/config/routes';
import Button from '@/components/ui/Button';

export function WishlistEmpty() {
  return (
    <div className="animate-in fade-in zoom-in-95 mx-auto flex flex-col items-center justify-center py-20 text-center duration-300">
      <div className="mb-6 rounded-full bg-neutral-50 p-6">
        <Heart className="size-10 text-neutral-300" />
      </div>

      <h2 className="text-2xl font-bold text-neutral-900">Your wishlist is empty</h2>
      <p className="mt-2 max-w-sm text-neutral-500">
        Looks like you haven&apos;t added any items to your wishlist yet.
      </p>

      <Link href={to.products()} className="mt-8">
        <Button>Start Shopping</Button>
      </Link>
    </div>
  );
}

import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { WishlistProducts } from './_components/WishlistProducts';

export const metadata: Metadata = {
  title: 'My Wishlist | Gossamer',
  description: 'View your saved items',
};

function WishlistPage() {
  return (
    <Container className="flex flex-col py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">My Wishlist</h1>
      </div>

      <WishlistProducts />
    </Container>
  );
}

export default WishlistPage;

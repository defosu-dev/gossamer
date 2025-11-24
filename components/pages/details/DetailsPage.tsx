'use client';

import SearchBar from '@/components/common/SearchBar/SearchBar';
import Container from '@/components/common/Container';

import ExploreSection from '../home/sections/explorecurated/ExploreSection';

import OrderBar from './OrderBar';
import InfoBlock from './InfoBlock';
import ProductGallery from './ProductGallery';

/**
 * Product details page combining gallery, product information, order controls
 * and related recommendations.
 *
 * @remarks
 * Layout is responsive: stacked on mobile, three-column on larger screens.
 * SearchBar is included directly on the page for quick access.
 */
export function DetailsPage() {
  return (
    <Container xCenter className="flex w-full flex-col">
      <SearchBar />

      {/* Product sections */}
      <div className="mt-5 flex w-full flex-col items-start gap-5 p-1 px-6 lg:flex-row">
        <div className="w-full max-w-120 border lg:w-auto">
          <ProductGallery src="" alt="" />
        </div>

        <div className="w-full flex-1 border">
          <InfoBlock src="" alt="" />
        </div>

        <div className="w-full max-w-80 border lg:w-80">
          <OrderBar src="" alt="" />
        </div>
      </div>

      {/* Related / Explore section */}
      <ExploreSection />
    </Container>
  );
}

export default DetailsPage;

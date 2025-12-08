import SearchBar from '@/components/modules/SearchBar/SearchBar';
import Container from '@/components/ui/Container';
import ProductGallery from './_components/ProductGallery';
import InfoBlock from './_components/ProductInfoBlock';
import ProductOrderBar from './_components/ProductOrderBar';
import ExploreSection from '@/app/_components/ExploreCurated/ExploreSection';

/**
 * Product details page combining gallery, product information, order controls
 * and related recommendations.
 *
 * @remarks
 * Layout is responsive: stacked on mobile, three-column on larger screens.
 * SearchBar is included directly on the page for quick access.
 */
export default function DetailsPage() {
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
          <ProductOrderBar src="" alt="" />
        </div>
      </div>

      {/* Related / Explore section */}
      <ExploreSection />
    </Container>
  );
}

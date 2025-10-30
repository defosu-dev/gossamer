import { ImageWithFallback } from "@/components/common/ImageWithFallback";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

const ProductImage = ({ src, alt, priority = false }: ProductImageProps) => {
  return (
    <div className="relative w-full aspect-square bg-zinc-200 rounded-lg overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        iconSize={6}
      />
    </div>
  );
};

export default ProductImage;

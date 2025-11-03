import { ImageWithFallback } from "@/components/common/ImageWithFallback";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

const ProductImage = ({ src, alt, priority = false }: ProductImageProps) => {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={alt}
        sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
        priority={priority}
        iconSize={6}
      />
    </div>
  );
};

export default ProductImage;

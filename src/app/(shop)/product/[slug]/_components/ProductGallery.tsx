'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import Badge from '@/components/ui/Badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

interface ProductGalleryProps {
  images: GalleryImage[];
  category?: string | null;
}

export default function ProductGallery({ images, category }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(images[0] ?? null);

  useEffect(() => {
    setSelectedImage(images[0] ?? null);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        No images
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-100 bg-white">
        {selectedImage && (
          <ImageWithFallback
            src={selectedImage.url}
            alt={selectedImage.alt || ''}
            width={400}
            height={400}
            className="h-full w-full object-contain"
          />
        )}

        {/* Category Badge (Optional) */}
        {category && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-white/90 text-neutral-900 shadow-sm backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="w-full max-w-sm snap-x snap-mandatory overflow-x-auto py-2">
          <div className="mx-auto flex w-max gap-3 px-1">
            {images.map((image) => {
              const isActive = selectedImage?.id === image.id;

              return (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={cn(
                    'shrink-0 cursor-pointer snap-center rounded-lg p-0.5 transition',
                    isActive ? 'shadow' : 'opacity-70 hover:opacity-100'
                  )}
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt || ''}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
      ;
    </div>
  );
}

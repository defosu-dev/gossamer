import React from 'react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

type ImageBlockProps = {
  src: string;
  alt: string;
};

const ImageBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-zinc-200 shadow-lg">
      <ImageWithFallback src={src} alt={alt} />
    </div>
  );
};

export default ImageBlock;

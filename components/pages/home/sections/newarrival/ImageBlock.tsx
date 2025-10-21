import React from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

type ImageBlockProps = {
  src: string;
  alt: string;
};

const ImageBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-zinc-200">
      <ImageWithFallback src={src} alt={alt} />
    </div>
  );
};

export default ImageBlock;

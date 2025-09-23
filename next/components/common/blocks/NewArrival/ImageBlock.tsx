// ImageBlock.tsx
import React from "react";

type ImageBlockProps = {
  src: string;
  alt: string;
};

const ImageBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-zinc-200">
      <img src={src} alt={alt} className="object-cover w-[500px] h-[460px]" />
    </div>
  );
};

export default ImageBlock;

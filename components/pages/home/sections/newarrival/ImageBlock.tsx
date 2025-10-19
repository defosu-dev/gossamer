import React from "react";
import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
};

const ImageBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-zinc-200">
      <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
    </div>
  );
};

export default ImageBlock;

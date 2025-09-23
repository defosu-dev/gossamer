import React from "react";
import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
};

const ImageBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-zinc-200 relative w-[500px] h-[460px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 500px"
      />
    </div>
  );
};

export default ImageBlock;

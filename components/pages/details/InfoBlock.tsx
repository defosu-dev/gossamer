import React from 'react';
import { Star, Heart } from 'lucide-react';
import Button from '@/components/common/Button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
type ImageBlockProps = {
  src: string;
  alt: string;
};

const InfoBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm">
      {/* Title */}
      <h1 className="mb-2 text-2xl font-bold">Marshall</h1>

      {/* Brand and Rating test*/}
      <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
        <span className="text-nowrap">
          Brand: <span className="font-medium text-gray-800">Marshall</span>
        </span>
        <div className="flex items-center text-nowrap">
          <Star className="mr-1 h-4 w-4 text-yellow-400" />
          <span>4.9 (346 rating)</span>
        </div>
        <div className="ml-auto flex cursor-pointer items-center text-nowrap text-gray-700 hover:text-red-500">
          <Heart className="mr-1 h-4 w-4" />
          Add to my wish list
        </div>
      </div>

      {/* Price test*/}
      <div className="mb-4">
        <p className="text-3xl font-semibold text-gray-900">$ 59.99</p>
        <p className="text-gray-400 line-through">100.00 USD</p>
      </div>

      {/* Choose Variant */}
      <div className="my-4 border-t border-b py-4">
        <h2 className="mb-3 text-lg font-semibold">Choose Variant</h2>
        <div className="flex gap-4">
          <div className="cursor-pointer rounded-xl border-2 border-gray-800 p-2">
            <ImageWithFallback src={src} alt={alt} width={60} height={60} className="rounded-md" />
          </div>
          <div className="cursor-pointer rounded-xl border p-2 hover:border-gray-800">
            <ImageWithFallback src={src} alt={alt} width={60} height={60} className="rounded-md" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex border-b text-sm font-medium">
        <button className="border-b-2 border-black px-4 py-2">Description</button>
        <button className="px-4 py-2 text-gray-500 hover:text-black">Seller Information</button>
      </div>

      {/* Description */}
      <div className="space-y-3 text-sm leading-relaxed text-gray-700">
        <p>
          The Xiaomi HEADSOUND series represents a fusion of cutting-edge audio technology and sleek
          design, catering to the demands of music enthusiasts in both Thailand and Indonesia.
          Crafted with precision and innovation, these audio devices promise an immersive sound
          experience.
        </p>
        <p className="font-medium">Key Features:</p>
        <ol className="list-inside list-decimal space-y-1">
          <li>
            <span className="font-medium">High-Fidelity Sound:</span> Immerse yourself in the world
            of crystal-clear audio with Xiaomi HEADSOUND. Whether you’re enjoying music, movies, or
            gaming, the devices deliver high-fidelity sound reproduction.
          </li>
          <li>
            <span className="font-medium">Sleek Design:</span> The headphones are designed with a
            modern aesthetic that blends comfort and elegance.
          </li>
        </ol>
      </div>

      {/* Read More Button */}
      <div className="mt-5 flex w-full flex-col">
        <Button variant="secondary">Add to Cart</Button>
      </div>
    </div>
  );
};

export default InfoBlock;

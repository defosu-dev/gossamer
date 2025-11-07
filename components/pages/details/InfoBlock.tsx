import React from "react";
import { Star, Heart } from "lucide-react";
import Button from "@/components/common/Button";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
type ImageBlockProps = {
  src: string;
  alt: string;
};

const InfoBlock = ({ src, alt }: ImageBlockProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-sm">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">Marshall</h1>

      {/* Brand and Rating test*/}
      <div className="flex items-center text-sm text-gray-500 mb-4 gap-3">
        <span className="text-nowrap">
          Brand: <span className="text-gray-800 font-medium">Marshall</span>
        </span>
        <div className="flex items-center text-nowrap">
          <Star className="size-4 text-yellow-400 mr-1" />
          <span>4.9 (346 rating)</span>
        </div>
        <div className="flex items-center ml-auto text-gray-700 cursor-pointer hover:text-red-500 text-nowrap">
          <Heart className="size-4 mr-1" />
          Add to my wish list
        </div>
      </div>

      {/* Price test*/}
      <div className="mb-4">
        <p className="text-3xl font-semibold text-gray-900">$ 59.99</p>
        <p className="text-gray-400 line-through">100.00 USD</p>
      </div>

      {/* Choose Variant */}
      <div className="border-t border-b py-4 my-4">
        <h2 className="font-semibold text-lg mb-3">Choose Variant</h2>
        <div className="flex gap-4">
          <div className="border-2 border-gray-800 rounded-xl p-2 cursor-pointer">
            <ImageWithFallback src={src} alt={alt} width={60} height={60} />
          </div>
          <div className="border rounded-xl p-2 cursor-pointer hover:border-gray-800">
            <ImageWithFallback src={src} alt={alt} width={60} height={60} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4 flex text-sm font-medium">
        <button className="border-b-2 border-black px-4 py-2">
          Description
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-black">
          Seller Information
        </button>
      </div>

      {/* Description */}
      <div className="text-gray-700 text-sm leading-relaxed space-y-3">
        <p>
          The Xiaomi HEADSOUND series represents a fusion of cutting-edge audio
          technology and sleek design, catering to the demands of music
          enthusiasts in both Thailand and Indonesia. Crafted with precision and
          innovation, these audio devices promise an immersive sound experience.
        </p>
        <p className="font-medium">Key Features:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <span className="font-medium">High-Fidelity Sound:</span> Immerse
            yourself in the world of crystal-clear audio with Xiaomi HEADSOUND.
            Whether you’re enjoying music, movies, or gaming, the devices
            deliver high-fidelity sound reproduction.
          </li>
          <li>
            <span className="font-medium">Sleek Design:</span> The headphones
            are designed with a modern aesthetic that blends comfort and
            elegance.
          </li>
        </ol>
      </div>

      {/* Read More Button */}
      <div className="flex flex-col w-full mt-5">
        <Button variant="secondary">Add to Cart</Button>
      </div>
    </div>
  );
};

export default InfoBlock;

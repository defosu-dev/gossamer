"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import {
  ImageWithFallback,
  ImageWithFallbackProps,
} from "@/components/common/ImageWithFallback";

export default function OrderBar({ src, alt }: ImageWithFallbackProps) {
  const [quantity, setQuantity] = useState(1);
  const price = 59.99;
  const oldPrice = 100;
  const stock = 14;

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1); // для теста

  return (
    <div className="max-w-sm w-full rounded-2xl border border-gray-200 p-5 shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">Organize adding to cart</h2>

      <div className="flex items-center gap-4 p-2">
        <div className=" flex min-w-10 h-10 rounded-lg overflow-hidden aspect-square ">
          <ImageWithFallback src={src} alt={alt} />
        </div>
        <p className="font-medium text-sm text-gray-800 w-full">Marshall</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center mt-4">
        <div className="flex items-center border rounded-full px-3 py-1 w-fit">
          <button
            onClick={handleDecrease}
            className="px-2 text-lg font-semibold text-gray-600 hover:text-black"
          >
            −
          </button>
          <span className="px-3 text-sm">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 text-lg font-semibold text-gray-600 hover:text-black"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-500 pl-5">Stock: {stock}</p>
      </div>

      {/* Price */}
      <div className="mt-5">
        <p className="text-sm text-gray-500">Subtotal:</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold">
            ${(price * quantity).toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 line-through">${oldPrice}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3">
        <Button variant="secondary">Add to Cart</Button>
        <Button variant="primary">Buy Now</Button>
      </div>
    </div>
  );
}

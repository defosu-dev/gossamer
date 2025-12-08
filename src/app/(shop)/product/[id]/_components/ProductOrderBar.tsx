'use client';

import Button from '@/components/ui/Button';
import type { ImageWithFallbackProps } from '@/components/ui/ImageWithFallback';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useState } from 'react';

interface ProductOrderBarProps extends Pick<ImageWithFallbackProps, 'src' | 'alt'> {}

/**
 * OrderBar.
 *
 * Product order controls with quantity selector, price calculation,
 * and add-to-cart / buy-now actions.
 *
 * @remarks
 * Client component required for local quantity state management.
 * Displays current variant preview, stock info and dynamic subtotal.
 */
export function ProductOrderBar({ src, alt }: ProductOrderBarProps) {
  const [quantity, setQuantity] = useState(1);
  const price = 59.99;
  const oldPrice = 100;
  const stock = 14;

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Organize adding to cart</h2>

      <div className="flex items-center gap-4 p-2">
        <div className="flex aspect-square h-10 min-w-10 overflow-hidden rounded-lg">
          <ImageWithFallback src={src} alt={alt} />
        </div>
        <p className="w-full text-sm font-medium text-gray-800">Marshall</p>
      </div>

      {/* Quantity controls */}
      <div className="mt-4 flex items-center">
        <div className="flex w-fit items-center rounded-full border px-3 py-1">
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
        <p className="pl-5 text-xs text-gray-500">Stock: {stock}</p>
      </div>

      {/* Price */}
      <div className="mt-5">
        <p className="text-sm text-gray-500">Subtotal:</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold">${(price * quantity).toFixed(2)}</p>
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

export default ProductOrderBar;

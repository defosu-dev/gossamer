'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Button from '@/components/ui/Button';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { to } from '@/config/routes';
import { useCart } from '@/hooks/useCart';
import type { ProductDetailDTO, ProductVariantDTO } from '@/types/api';

interface ProductOrderBarProps {
  product: ProductDetailDTO;
  selectedVariant: ProductVariantDTO;
}

function ProductOrderBar({ product, selectedVariant }: ProductOrderBarProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const stock = selectedVariant.stock ?? 0;
  const price = selectedVariant.price ?? 0;
  const oldPrice = selectedVariant.oldPrice;

  const imageUrl = selectedVariant.images?.[0]?.url ?? '';

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleIncrease = () => {
    setQuantity((q) => (q < stock ? q + 1 : q));
  };

  const handleAddToCart = () => {
    if (stock === 0) {
      toast.error('Out of stock');
      return;
    }

    try {
      addItem({
        id: selectedVariant.id,
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        slug: product.slug,
        price: price,
        oldPrice: oldPrice ?? null,
        imageUrl: imageUrl,
        quantity: quantity,
        attributesDescription: '',
      });
    } catch {
      toast.error('Error adding to cart');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(to.checkout());
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>

      <div className="flex items-center gap-4 p-2">
        <div className="relative flex aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
          <ImageWithFallback
            src={imageUrl}
            alt={product.title}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <p className="line-clamp-2 w-full text-sm font-medium text-gray-800">
          {product.title}
          {selectedVariant.name && (
            <span className="mt-1 block text-xs text-gray-500">{selectedVariant.name}</span>
          )}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex w-fit items-center rounded-full border border-gray-300 px-3 py-1">
          <button
            onClick={handleDecrease}
            className="px-2 text-lg font-semibold text-gray-600 hover:text-black disabled:opacity-50"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="min-w-[20px] text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 text-lg font-semibold text-gray-600 hover:text-black disabled:opacity-50"
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Stock: {stock}</p>
          {stock < 10 && stock > 0 && (
            <p className="text-xs font-medium text-amber-600">Low stock!</p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 border-t border-gray-50 pt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-gray-500">Total:</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-neutral-900">${(price * quantity).toFixed(2)}</p>
            {oldPrice && oldPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                ${(oldPrice * quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3">
        <Button
          variant="secondary"
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="w-full"
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <Button variant="primary" onClick={handleBuyNow} disabled={stock === 0} className="w-full">
          Buy Now
        </Button>
      </div>
    </div>
  );
}

export default ProductOrderBar;

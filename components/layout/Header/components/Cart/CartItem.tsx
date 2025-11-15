"use client";

import { Badge } from "@/components/common/Badge";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import CartItemDescription from "./CartItemDescription";
import CartItemPrice from "./CartItemPrice";
import InputQuantity from "./InputQuantity";

/**
 * Props for an individual cart item in the dropdown.
 *
 * @typedef {Object} CartItemProps
 * @property {string} variantId - Unique identifier for the product variant.
 * @property {string} title - Display name of the product.
 * @property {string} image - URL of the main product image.
 * @property {Object} price
 * @property {number} price.currentPrice - Current selling price.
 * @property {number} price.oldPrice - Original price (0 if none).
 * @property {number} quantity - Current quantity from parent/store.
 * @property {{ label: string; value: string }[]} [attributes] - Optional variant attributes.
 * @property {(variantId: string, quantity: number) => void} onChange - Quantity change handler.
 */
export type CartItemProps = {
  variantId: string;
  title: string;
  image: string;
  price: {
    currentPrice: number;
    oldPrice: number;
  };
  quantity: number;
  attributes?: { label: string; value: string }[];
  onChange: (variantId: string, quantity: number) => void;
};

/**
 * CartItem — single cart entry with optimistic updates.
 *
 * @component
 * @param {CartItemProps} props
 * @returns {JSX.Element}
 */
const CartItem = memo(
  ({
    variantId,
    title,
    image,
    price,
    quantity: externalQuantity,
    attributes = [],
    onChange,
  }: CartItemProps) => {
    const [localQuantity, setLocalQuantity] = useState(externalQuantity);
    const prevExternal = useRef(externalQuantity);

    const debouncedSend = useDebouncedCallback((qty: number) => {
      onChange(variantId, qty);
    }, 300);

    useEffect(() => {
      if (
        prevExternal.current !== externalQuantity &&
        externalQuantity !== localQuantity
      ) {
        setLocalQuantity(externalQuantity);
      }
      prevExternal.current = externalQuantity;
    }, [externalQuantity, localQuantity]);

    const handleQuantityChange = useCallback(
      (newQty: number) => {
        if (newQty < 1) return;
        setLocalQuantity(newQty);
        debouncedSend(newQty);
      },
      [debouncedSend]
    );

    return (
      <li className="grid grid-cols-4 gap-3 p-3">
        <div className="col-span-1 relative w-full aspect-square rounded-lg overflow-hidden shadow">
          <ImageWithFallback
            src={image}
            alt={title}
            sizes="(max-width: 400px) 100vw, (max-width: 700px) 50vw, 282px"
            iconSize={6}
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <Badge as="link" href="#" className="self-start">
            Product
          </Badge>

          <div className="font-bold text-gray-800 truncate mt-2" title={title}>
            {title}
          </div>

          <CartItemDescription items={attributes} className="mt-1" />
        </div>

        <div className="col-span-1 flex flex-col items-end">
          <CartItemPrice
            currentPrice={price.currentPrice}
            oldPrice={price.oldPrice}
            className="text-end"
          />

          <InputQuantity
            quantity={localQuantity}
            onChange={handleQuantityChange}
            className="mt-auto"
          />
        </div>
      </li>
    );
  }
);

CartItem.displayName = "CartItem";

export default CartItem;

"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { ImageWithFallback } from "../../../components/common/ImageWithFallback";
import { Badge } from "../../../components/common/Badge";
import { Trash } from "lucide-react";
import CartItemDescription, {
  CartItemDescriptionProps,
} from "@/components/layout/Header/components/Cart/CartItemDescription";
import CartItemPrice, {
  CartItemPriceProps,
} from "@/components/layout/Header/components/Cart/CartItemPrice";
import InputQuantity from "@/components/layout/Header/components/Cart/InputQuantity";

type CartItemProps = {
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
  imageUrl?: string;
  badge?: string;
  title: string;
  handle: string;
  descriptionItems: CartItemDescriptionProps["items"];
  price: CartItemPriceProps;
  quantity?: number;
  onQuantityChange: (newQuantity: number) => void;
  onDelete: () => void;
};

const CartPage = () => {
  const [cartItems] = useState<CartItemProps[]>([
    {
      imageUrl: "/placeholder.jpg",
      badge: "New",
      title: "Sample Product 1",
      handle: "sample-product-1",
      descriptionItems: [
        { label: "Type", value: "Gadget" },
        { label: "Color", value: "Red" },
      ],
      price: { currentPrice: 49.99, oldPrice: 59.99 },
      quantity: 2,
      onQuantityChange: (newQuantity: number) => {
        console.log("Quantity changed to:", newQuantity);
      },
      onDelete: () => {
        console.log("Delete item");
      },
    },
    {
      imageUrl: "/placeholder.jpg",
      badge: "Sale",
      title: "Sample Product 2",
      handle: "sample-product-2",
      descriptionItems: [
        { label: "Type", value: "Accessory" },
        { label: "Color", value: "Blue" },
      ],
      price: { currentPrice: 19.99 },
      quantity: 1,
      onQuantityChange: (newQuantity: number) => {
        console.log("Quantity changed to:", newQuantity);
      },
      onDelete: () => {
        console.log("Delete item");
      },
    },
  ]);
  const breadCrumbs = [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <Container>
      <div className="flex flex-col w-full">
        <Breadcrumbs items={breadCrumbs} />

        <h2 className={cn("text-5xl text-neutral-900 font-bold", "mt-4")}>
          My Cart
        </h2>
        <div className="mt-10 flex flex-col-reverse md:flex-row gap-8 w-full">
          <div className="flex flex-1 flex-col w-full gap-6">
            <div className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg">
              <div>
                <input type="checkbox" name="Select All" id="select-all" />{" "}
                <label htmlFor="select-all">Select All</label>{" "}
              </div>
              <Button>Delete</Button>
            </div>
            <div className="flex flex-col gap-4">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItem key={index} {...item} />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>
          <SummaryOrder />
        </div>
      </div>
    </Container>
  );
};

export default CartPage;

const EmptyCart = () => {
  return (
    <div className="flex gap-4 p-4 border border-neutral-200 rounded-lg items-center py-20 justify-center">
      <h3 className="text-2xl font-bold text-neutral-500">
        Your cart is empty
      </h3>
    </div>
  );
};

const SummaryOrder = () => {
  return (
    <div className="flex flex-col p-4 border border-neutral-200 rounded-lg h-fit sticky top-20 min-w-xs w-full md:w-fit gap-2">
      <h3 className="text-xl font-bold text-neutral-900">Summary Order</h3>
      <div className="flex gap-4 justify-between items-baseline">
        <span className="text-neutral-600">Subtotal:</span>
        <span className="text-neutral-900 text-lg font-bold">$0</span>
      </div>
      <Button>Buy Now(3)</Button>
    </div>
  );
};

const Breadcrumbs = ({
  items,
}: {
  items: { label: string; href: string }[];
}) => {
  return (
    <nav aria-label="breadcrumb" className="mt-4">
      <ol className="flex gap-1 items-center">
        {items.map((crumb, index) => (
          <li
            key={index + crumb.label}
            className="text-sm font-medium text-neutral-600"
          >
            <Link
              href={crumb.href}
              className={
                index === items.length - 1 ? "font-bold text-neutral-900" : ""
              }
            >
              {crumb.label}
            </Link>{" "}
            {index < items.length - 1 && "/"}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const CartItem = ({
  isSelected = false,
  onSelect,
  imageUrl = "",
  badge,
  title,
  handle,
  descriptionItems,
  price,
  quantity = 1,
  onQuantityChange,
  onDelete,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 p-4 border border-neutral-200 rounded-lg items-center">
      <input
        type="checkbox"
        name={`select-item-${handle}`}
        id={`select-item-${handle}`}
        className="self-start"
      />
      <div className="w-28 h-28 flex-shrink-0 border border-neutral-200 rounded-lg overflow-hidden">
        <ImageWithFallback src={imageUrl} alt={title} />
      </div>
      <div className="flex flex-col flex-1 h-full pb-2">
        {badge && (
          <Badge as="span" className="mb-2">
            {badge}
          </Badge>
        )}
        <Link
          href={`product?handle=${handle}`}
          className="text-lg font-bold text-neutral-900 line-clamp-1 mt-auto"
        >
          {title}
        </Link>
        <CartItemDescription items={descriptionItems} className="mt-1" />
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <CartItemPrice
          currentPrice={price.currentPrice}
          oldPrice={price.oldPrice}
        />
        <div className="flex gap-4 items-center">
          <button
            className="hover:text-red-600 transition-colors duration-200"
            onClick={onDelete}
            aria-label="Delete Item"
          >
            <Trash className="size-4" />
          </button>
          <InputQuantity quantity={quantity} onChange={onQuantityChange} />
        </div>
      </div>
    </div>
  );
};

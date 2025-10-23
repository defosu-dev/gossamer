import React from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/common/Badge";
import { Minus, Plus } from "lucide-react";

export type CartItemType = {
  handle: string;
  title: string;
  image: string;
  price: CartItemPriceProps;
  quantity: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
  const productDescription: CartItemDescriptionProps["items"] = [
    { label: "Type", value: "Stereo" },
    { label: "Color", value: "Black" },
  ]

  return (
    <li className={cn(
      "grid grid-cols-4 gap-3 p-3",
    )}>
      <div className="col-span-1 w-full h-full aspect-square">
        <ImageWithFallback src={item.image} alt={item.title} width={48} height={48} className="border min-w-full min-h-full border-neutral-500 rounded" />
      </div>
      <div className="col-span-2 flex flex-col">
        <Badge as={"link"} href={"#"}>Other</Badge>
        <div className="font-bold text-gray-800 truncate mt-2">{item.title}</div>
        <CartItemDescription items={productDescription} className="mt-1" />
      </div>
      <div className="col-span-1 flex flex-col items-end">
        <CartItemPrice currentPrice={item.price.currentPrice} className="text-end"/>
        <InputQuantity quantity={item.quantity} onChange={() => { }} className="mt-2" />
        
      </div>
    </li>
  );
}

export const InputQuantity = ({ quantity, onChange, className }: { quantity: number; onChange: (newQuantity: number) => void; className?: string }) => {
  return (
    <div className={cn("flex h-8 rounded-md border border-neutral-300 overflow-hidden bg-neutral-50 shadow", className)}>
      <button className="w-8 flex justify-center items-center cursor-pointer" onClick={() => onChange(quantity - 1)} ><Plus className="size-3" /></button>
      <span className="w-8 flex items-center justify-center text-sm font-semibold">{quantity}</span>
      <button className="w-8 flex justify-center items-center cursor-pointer" onClick={() => onChange(quantity + 1)}><Minus className="size-3" /></button>
    </div>)
}

export type CartItemDescriptionProps = {
  items: { label: string; value: string }[];
  className?: string;
};

export const CartItemDescription = ({items, className="" }: CartItemDescriptionProps) => {
  return (
    <div className={cn("flex gap-4 items-center text-sm text-gray-600", className)}>
      
      {items.map((item, index) => (<div key={index+item.label}>{item.label}: <span className="font-semibold text-gray-800">{item.value}</span></div>))}
    </div>
  )
}

export type CartItemPriceProps = {
  currentPrice: number;
  oldPrice?: number;
  className?: string;
};
 
export const CartItemPrice = ({ currentPrice, oldPrice = 1212, className="" }: CartItemPriceProps ) => { 
  return (
    <div className={cn("flex flex-col", className)}>
      { oldPrice > currentPrice && <span className="line-through">${oldPrice}</span> }
      <span className="text-lg font-bold">${currentPrice}</span>
    </div>
  )
}
import React from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/common/Badge";
import { Minus, Plus } from "lucide-react";

export type CartItemType = {
  handle: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
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
        <div className="flex gap-4 items-center text-sm text-gray-600 mt-1">
          <div>Type: <span className="font-semibold text-gray-800">Stereo</span></div>
          <div>Color: <span className="font-semibold text-gray-800">Black</span></div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-end">
        <span className="line-through">$100</span>
        <span className="text-lg font-bold">$29.90</span>
        <div className="flex h-8 rounded-md border border-neutral-300 mt-2 overflow-hidden bg-neutral-50 shadow">
          <button className="w-8 flex justify-center items-center cursor-pointer"><Plus className="size-3" /></button>
          <span className="w-8 flex items-center justify-center text-sm font-semibold">10</span>
          <button className="w-8 flex justify-center items-center cursor-pointer"><Minus className="size-3" /></button>
        </div>
        
      </div>
    </li>
  );
}
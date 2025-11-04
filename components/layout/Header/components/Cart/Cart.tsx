"use client";
import { useState } from "react";
import CartDropdown from "./CartDropdown";
import { CartItemType } from "./CartItem";
import CartButton from "./CartButton";
import DarkBackground from "@/components/common/DarkBackground";

export default function Cart() {
  const [open, setOpen] = useState(false);

  const items: CartItemType[] = [
    {
      handle: "p1",
      title: "Product 1",
      image: "https://via.placeholder.com/150",
      price: { currentPrice: 29.99 },
      quantity: 1,
    },
    {
      handle: "p2",
      title: "Product 2",
      image: "https://via.placeholder.com/150",
      price: { currentPrice: 19.99 },
      quantity: 2,
    },
  ];

  return (
    <div className="relative">
      <CartButton
        onClick={() => setOpen((s) => !s)}
        open={open}
        count={items.length}
      />
      <DarkBackground open={open} setOpen={() => setOpen(false)} />
      <CartDropdown open={open} onClose={() => setOpen(false)} items={items} />
    </div>
  );
}

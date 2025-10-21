import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify-clients";
import { GET_CART } from "@/lib/graphql/queries/cart";
import { ADD_CART_LINES } from "@/lib/graphql/mutations/cart";

export const dynamic = "force-dynamic";

type Price = {
  amount: string;
  currencyCode: string;
}

type ProductVariant = {
  id: string;
  title: string;
  price: Price;
  product: { id: string; title: string; handle: string };
}

type CartLine = {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
}

type Cart = {
  id: string;
  webUrl: string;
  totalQuantity: number;
  lines?: { edges: { node: CartLine }[] };
}

type UserError = {
  code: string;
  field: string[];
  message: string;
}

type CartResponse = {
  cart: Cart | null;
}

type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: Cart | null;
    userErrors: UserError[];
  };
}

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });

  try {
    const data = await shopifyClient.request<CartResponse>(GET_CART, { id: cartId });
    return NextResponse.json(data.cart || null);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { cartId, items } = await request.json();
    if (!cartId || !items) return NextResponse.json({ error: "Cart ID and items are required" }, { status: 400 });

    const lines: CartLineInput[] = items.map((item: { variant: { id: string }; quantity: number }) => ({
      merchandiseId: item.variant.id,
      quantity: item.quantity,
    }));

    const data = await shopifyClient.request<CartLinesAddResponse>(ADD_CART_LINES, { cartId, lines });
    return NextResponse.json(data.cartLinesAdd.cart);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to sync cart" }, { status: 500 });
  }
}
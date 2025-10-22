import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify-clients";
import { CREATE_CART, ADD_CART_LINES, UPDATE_CART_BUYER_IDENTITY } from "@/lib/graphql/mutations/cart";

export const dynamic = "force-dynamic";

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
}

type Cart = {
  id: string;
  webUrl: string;
  totalQuantity: number;
}

type UserError = {
  code: string;
  field: string[];
  message: string;
}

type CartCreateResponse = {
  cartCreate: {
    cart: Cart | null;
    userErrors: UserError[];
  };
}

type CartLinesAddResponse = {
  cartLinesAdd: {
    cart: Cart | null;
    userErrors: UserError[];
  };
}

type CartBuyerIdentityUpdateResponse = {
  cartBuyerIdentityUpdate: {
    cart: Cart | null;
    userErrors: UserError[];
  };
}

export async function POST(request: Request) {
  try {
    const { items, customerToken } = await request.json();
    if (!items || !customerToken) return NextResponse.json({ error: "Items and customer token are required" }, { status: 400 });


    const createData = await shopifyClient.request<CartCreateResponse>(CREATE_CART, { lines: [] });
    const cart = createData.cartCreate.cart;
    if (!cart) return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });

    const lines: CartLineInput[] = items.map((item: { variant: { id: string }; quantity: number }) => ({
      merchandiseId: item.variant.id,
      quantity: item.quantity,
    }));


    await shopifyClient.request<CartLinesAddResponse>(ADD_CART_LINES, { cartId: cart.id, lines });


    await shopifyClient.request<CartBuyerIdentityUpdateResponse>(UPDATE_CART_BUYER_IDENTITY, {
      cartId: cart.id,
      buyerIdentity: { customerAccessToken: customerToken },
    });

    return NextResponse.json({ cartId: cart.id, items });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to migrate cart" }, { status: 500 });
  }
}
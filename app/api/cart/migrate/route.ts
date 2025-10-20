import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { items, customerToken } = await request.json();

        if (!items || !customerToken) {
            return NextResponse.json({ error: "Items and customer token are required" }, { status: 400 });
        }

        const shop = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

        if (!shop || !token) {
            return NextResponse.json({ error: "Missing Shopify configuration" }, { status: 500 });
        }

        // Create new cart
        const createMutation = `#graphql
      mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart { id webUrl totalQuantity }
          userErrors { code field message }
        }
      }
    `;

        const createRes = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: createMutation,
                variables: { lines: [] },
            }),
        });

        const createData = await createRes.json();
        const cart = createData.data?.cartCreate?.cart;

        if (!cart) {
            return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
        }

        // Add items to cart
        const lines = items.map((item: any) => ({
            merchandiseId: item.variant.id,
            quantity: item.quantity,
        }));

        const addMutation = `#graphql
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { id webUrl totalQuantity }
          userErrors { code field message }
        }
      }
    `;

        await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: addMutation,
                variables: { cartId: cart.id, lines },
            }),
        });

        // Associate cart with customer
        const identityMutation = `#graphql
      mutation CartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart { id webUrl totalQuantity }
          userErrors { code field message }
        }
      }
    `;

        await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: identityMutation,
                variables: {
                    cartId: cart.id,
                    buyerIdentity: { customerAccessToken: customerToken }
                },
            }),
        });

        return NextResponse.json({
            cartId: cart.id,
            items: items,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to migrate cart" }, { status: 500 });
    }
}

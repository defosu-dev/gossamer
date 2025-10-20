import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
        return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

    if (!shop || !token) {
        return NextResponse.json({ error: "Missing Shopify configuration" }, { status: 500 });
    }

    try {
        const res = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: `query Cart($id: ID!) {
          cart(id: $id) {
            id webUrl totalQuantity
            lines(first: 100) {
              edges {
                node {
                  id quantity
                  merchandise {
                    ... on ProductVariant {
                      id title price { amount currencyCode }
                      product { id title handle }
                    }
                  }
                }
              }
            }
          }
        }`,
                variables: { id: cartId }
            }),
        });

        const data = await res.json();
        return NextResponse.json(data.data?.cart || null);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch cart" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { cartId, items } = await request.json();

        if (!cartId || !items) {
            return NextResponse.json({ error: "Cart ID and items are required" }, { status: 400 });
        }

        const shop = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

        if (!shop || !token) {
            return NextResponse.json({ error: "Missing Shopify configuration" }, { status: 500 });
        }

        // Convert items to Shopify format
        const lines = items.map((item: any) => ({
            merchandiseId: item.variant.id,
            quantity: item.quantity,
        }));

        const mutation = `#graphql
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { id webUrl totalQuantity }
          userErrors { code field message }
        }
      }
    `;

        const res = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: mutation,
                variables: { cartId, lines },
            }),
        });

        const data = await res.json();
        return NextResponse.json(data.data?.cartLinesAdd?.cart);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to sync cart" }, { status: 500 });
    }
}

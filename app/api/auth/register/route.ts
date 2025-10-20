import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const shop = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

        if (!shop || !token) {
            return NextResponse.json({ error: "Missing Shopify configuration" }, { status: 500 });
        }

        const mutation = `#graphql
      mutation CustomerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer { id email firstName lastName }
          customerUserErrors { code field message }
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
                variables: { input: { email, password, firstName, lastName } },
            }),
        });

        const data = await res.json();
        const customer = data.data?.customerCreate?.customer;

        if (!customer) {
            return NextResponse.json({ error: "Registration failed" }, { status: 400 });
        }

        return NextResponse.json({
            customer,
            message: "Registration successful",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
    }
}

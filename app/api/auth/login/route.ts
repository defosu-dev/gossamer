import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const shop = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

        if (!shop || !token) {
            return NextResponse.json({ error: "Missing Shopify configuration" }, { status: 500 });
        }

        // Create customer access token
        const mutation = `#graphql
      mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken { accessToken expiresAt }
          customerUserErrors { code field message }
        }
      }
    `;

        const tokenRes = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: mutation,
                variables: { input: { email, password } },
            }),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.data?.customerAccessTokenCreate?.customerAccessToken;

        if (!accessToken) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Get customer data
        const customerQuery = `#graphql
      query Customer($token: String!) {
        customer(customerAccessToken: $token) {
          id email firstName lastName
        }
      }
    `;

        const customerRes = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": token,
            },
            body: JSON.stringify({
                query: customerQuery,
                variables: { token: accessToken.accessToken }
            }),
        });

        const customerData = await customerRes.json();
        const customer = customerData.data?.customer;

        return NextResponse.json({
            customer,
            accessToken: accessToken.accessToken,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
    }
}

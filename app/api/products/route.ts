import { NextResponse } from "next/server";

function getEnv(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const first = Number(searchParams.get("first") || 12);
    const withReviews = searchParams.get("withReviews") === "true";

    const shop = getEnv("SHOPIFY_STORE_DOMAIN");
    const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

    if (!storefrontToken) {
        return NextResponse.json({
            error: "missing_storefront_token",
            message: "Provide SHOPIFY_STOREFRONT_TOKEN in env or use Admin OAuth."
        }, { status: 500 });
    }

    try {
        if (handle) {
            // Single product query
            const query = `#graphql
                query ProductByHandle($handle: String!) {
                    product(handle: $handle) {
                        id title handle description
                        featuredImage { url altText }
                        images(first: 10) { edges { node { url altText } } }
                        variants(first: 25) {
                            edges { node { id title availableForSale price { amount currencyCode } } }
                        }
                    }
                }
            `;

            const res = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": storefrontToken,
                },
                body: JSON.stringify({ query, variables: { handle } }),
            });

            if (!res.ok) {
                const text = await res.text();
                return NextResponse.json({ error: "storefront_request_failed", detail: text }, { status: 502 });
            }

            const json = await res.json();

            // Add reviews if requested
            if (withReviews && json.data?.product) {
                try {
                    const reviewsRes = await fetch(`${request.url.split('?')[0].replace('/api/products', '/api/reviews')}?handle=${handle}&variant=summary`);
                    const reviewsData = await reviewsRes.json();
                    json.data.product.reviews = reviewsData;
                } catch (error) {
                    console.warn('Failed to fetch reviews:', error);
                }
            }

            return NextResponse.json(json, { status: 200 });
        } else {
            // Products list query
            const query = `#graphql
                query Products($first: Int!) {
                    products(first: $first) {
                        edges {
                            node { 
                                id title handle 
                                featuredImage { url altText }
                                priceRange { minVariantPrice { amount currencyCode } }
                            }
                        }
                    }
                }
            `;

            const res = await fetch(`https://${shop}/api/2025-10/graphql.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": storefrontToken,
                },
                body: JSON.stringify({ query, variables: { first } }),
            });

            if (!res.ok) {
                const text = await res.text();
                return NextResponse.json({ error: "storefront_request_failed", detail: text }, { status: 502 });
            }

            const json = await res.json();
            return NextResponse.json(json, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Request failed" }, { status: 500 });
    }
}

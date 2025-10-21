import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify-clients";
import { GET_PRODUCT, GET_PRODUCTS } from "@/lib/graphql/queries/products";

export const dynamic = "force-dynamic";

interface Price {
  amount: string;
  currencyCode: string;
}

interface Image {
  url: string;
  altText: string | null;
}

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Price;
  compareAtPrice: Price | null;
  discountPercent?: number;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  featuredImage: Image | null;
  images: { edges: { node: Image }[] };
  variants: { edges: { node: Variant }[] };
  reviews?: unknown;
}

interface ProductsResponse {
  products: { edges: { node: Product }[] };
}

interface ProductResponse {
  product: Product | null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle");
  const first = Number(searchParams.get("first") || 12);
  const withReviews = searchParams.get("withReviews") === "true";

  try {
    const query = handle ? GET_PRODUCT : GET_PRODUCTS;

    const data = await shopifyClient.request<ProductResponse | ProductsResponse>(query, handle ? { handle } : { first });

    const addDiscount = (variants: { node: Variant }[]) =>
      variants.forEach((v) => {
        const price = parseFloat(v.node.price.amount);
        const compare = v.node.compareAtPrice ? parseFloat(v.node.compareAtPrice.amount) : null;
        v.node.discountPercent = compare && compare > price ? Math.round(((compare - price) / compare) * 100) : 0;
      });

    if ("product" in data && data.product?.variants.edges) addDiscount(data.product.variants.edges);
    if ("products" in data) data.products.edges.forEach((p) => p.node.variants.edges && addDiscount(p.node.variants.edges));

    if (withReviews && handle && "product" in data && data.product) {
      try {
        const reviewsRes = await fetch(
          `${req.url.split("?")[0].replace("/api/products", "/api/reviews")}?handle=${handle}&variant=summary`
        );
        data.product.reviews = await reviewsRes.json();
      } catch { }
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Request failed" }, { status: 500 });
  }
}
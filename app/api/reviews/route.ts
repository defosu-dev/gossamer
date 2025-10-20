import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required env var: ${name}`);
    return value;
}

async function judgemeFetch(path: string, method: "GET" | "POST", paramsOrBody?: Record<string, any>, usePrivate = false) {
    const shop = getEnv("SHOPIFY_STORE_DOMAIN");
    const token = usePrivate ? getEnv("JUDGEME_PRIVATE_TOKEN") : getEnv("JUDGEME_PUBLIC_TOKEN");

    if (method === "GET") {
        const url = new URL(`https://judge.me/api/v1${path}`);
        url.searchParams.set("shop_domain", shop);
        url.searchParams.set("api_token", token);
        for (const [k, v] of Object.entries(paramsOrBody || {})) {
            if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
        }
        const res = await fetch(url.toString(), { method: "GET" });
        if (!res.ok) throw new Error(`Judge.me GET failed ${res.status}`);
        return res.json();
    } else {
        const res = await fetch(`https://judge.me/api/v1${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                shop_domain: shop,
                api_token: token,
                ...(paramsOrBody || {}),
            }),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Judge.me POST failed ${res.status}: ${text.slice(0, 400)}`);
        }
        return res.json();
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");
    const page = Number(searchParams.get("page") || 1);
    const perPage = Number(searchParams.get("per_page") || 10);
    const variant = searchParams.get("variant") || "summary";

    if (!handle) return NextResponse.json({ error: "handle is required" }, { status: 400 });

    try {
        if (variant === "list") {
            const list = await judgemeFetch("/reviews", "GET", {
                reviewable_type: "product",
                reviewable_handle: handle,
                per_page: perPage,
                page,
            });
            return NextResponse.json(list);
        } else {
            const widget = await judgemeFetch("/widgets/product_review", "GET", { handle });
            return NextResponse.json(widget);
        }
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "judgeme_failed" }, { status: 502 });
    }
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => ({}));
    const { handle, rating, title, text, name, email } = body || {};
    if (!handle || !rating || !name || !email)
        return NextResponse.json({ error: "handle, rating, name, email are required" }, { status: 400 });
    try {
        const resp = await judgemeFetch("/reviews", "POST", {
            review: {
                reviewable_type: "product",
                reviewable_handle: handle,
                rating,
                title,
                body: text,
                reviewer: { name, email },
            },
        }, true);
        return NextResponse.json(resp, { status: 201 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "create_failed" }, { status: 502 });
    }
}

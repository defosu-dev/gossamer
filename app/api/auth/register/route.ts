import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify-clients";
import { CREATE_CUSTOMER } from "@/lib/graphql/mutations/auth";

export const dynamic = "force-dynamic";

type Customer = {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
}

type CustomerUserError = {
    code: string;
    field: string[];
    message: string;
}

type CustomerCreateResponse = {
    customerCreate: {
        customer: Customer | null;
        customerUserErrors: CustomerUserError[];
    };
}


export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName } = await request.json();
        if (!email || !password) return NextResponse.json({ error: "Email and password are required" }, { status: 400 });

        const data = await shopifyClient.request<CustomerCreateResponse>(CREATE_CUSTOMER, { input: { email, password, firstName, lastName } });
        const customer = data.customerCreate.customer;
        if (!customer) return NextResponse.json({ error: "Registration failed" }, { status: 400 });

        return NextResponse.json({ customer, message: "Registration successful" });
    } catch (err) {
        return NextResponse.json({ error: err instanceof Error ? err.message : "Registration failed" }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify-clients";
import { CREATE_CUSTOMER_ACCESS_TOKEN } from "@/lib/graphql/mutations/auth";
import { GET_CUSTOMER } from "@/lib/graphql/queries/auth";

export const dynamic = "force-dynamic";

type CustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
}

type CustomerUserError = {
  code: string;
  field: string[];
  message: string;
}

type Customer = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

type AccessTokenResponse = {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

type CustomerResponse = {
  customer: Customer | null;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password are required" }, { status: 400 });


    const tokenData = await shopifyClient.request<AccessTokenResponse>(CREATE_CUSTOMER_ACCESS_TOKEN, { input: { email, password } });
    const accessToken = tokenData.customerAccessTokenCreate.customerAccessToken;
    if (!accessToken) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });


    const customerData = await shopifyClient.request<CustomerResponse>(GET_CUSTOMER, { token: accessToken.accessToken });
    const customer = customerData.customer;

    return NextResponse.json({ customer, accessToken: accessToken.accessToken });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Login failed" }, { status: 500 });
  }
}
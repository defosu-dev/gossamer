import { GraphQLClient } from "graphql-request";

export const shopifyClient = new GraphQLClient(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`,
    {
        headers: { "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN! },
    }
);
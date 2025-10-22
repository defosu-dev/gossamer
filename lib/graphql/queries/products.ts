import { gql } from "graphql-request";

export const GET_PRODUCT = gql`
  query ($handle: String!) {
    product(handle: $handle) {
      id title handle description featuredImage { url altText }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 25) {
        edges { node { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } } }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query ($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id title handle featuredImage { url altText }
          variants(first: 25) {
            edges { node { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

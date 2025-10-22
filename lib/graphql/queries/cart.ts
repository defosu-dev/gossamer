import { gql } from "graphql-request";

export const GET_CART = gql`
  query ($id: ID!) {
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
  }
`;

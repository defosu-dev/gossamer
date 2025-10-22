import { gql } from "graphql-request";

export const ADD_CART_LINES = gql`
  mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id webUrl totalQuantity }
      userErrors { code field message }
    }
  }
`;

export const CREATE_CART = gql`
  mutation ($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { id webUrl totalQuantity }
      userErrors { code field message }
    }
  }
`;

export const UPDATE_CART_BUYER_IDENTITY = gql`
  mutation ($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { id webUrl totalQuantity }
      userErrors { code field message }
    }
  }
`;

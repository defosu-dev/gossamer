import { gql } from "graphql-request";

export const CREATE_CUSTOMER_ACCESS_TOKEN = gql`
  mutation ($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation ($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email firstName lastName }
      customerUserErrors { code field message }
    }
  }
`;

import { gql } from "graphql-request";

export const GET_CUSTOMER = gql`
  query ($token: String!) {
    customer(customerAccessToken: $token) {
      id email firstName lastName
    }
  }
`;

import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export type LoginFormValues = {
  username: string;
  password: string;
};

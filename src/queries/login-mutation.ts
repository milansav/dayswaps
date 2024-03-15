import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export type LoginFormProps = {
  username: string;
  password: string;
};

export type LoginReturnValue = {
  token: string;
};

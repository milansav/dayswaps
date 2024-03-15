import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      firstName
      lastName
      email
      telephone
    }
  }
`;

export type Me = {
  me: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string | null;
  };
};

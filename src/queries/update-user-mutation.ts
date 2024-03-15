import { gql } from "@apollo/client";
import { Me } from "./me-query";

export const UPDATE_USER_QUERY = gql`
  mutation Mutation($userUpdateId: ID!, $data: UserUpdateInputData!) {
    userUpdate(id: $userUpdateId, data: $data) {
      id
      name
      firstName
      lastName
      email
      telephone
    }
  }
`;

export type UpdateUserProps = {
  data: {
    firstName: string;
    telephone: string | null;
    lastName: string;
  };
  userUpdateId: string;
};

export type UpdateUserValue = { userUpdate: Me["me"] };

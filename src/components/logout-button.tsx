import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DayswapsButton } from "./dayswaps/dayswaps-button";

const LOGOUT_MUTATION = gql`
  mutation Mutation {
    logout
  }
`;

type LogoutButtonProps = {};

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const [useLogoutMutation, { loading, error }] = useMutation(LOGOUT_MUTATION);
  const navigate = useNavigate();

  const logout = () => {
    useLogoutMutation().then((loggedOut) => {
      if (loggedOut) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <DayswapsButton onClick={logout}>
      {loading ? "Načítání..." : "Odhlásit"}
    </DayswapsButton>
  );
};

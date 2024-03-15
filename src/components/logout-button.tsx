import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGOUT_MUTATION } from "../queries/logout-query";
import { DayswapsButton } from "./dayswaps/dayswaps-button";

type LogoutButtonProps = {};

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const [useLogoutMutation, { loading, error }] =
    useMutation<boolean>(LOGOUT_MUTATION);
  const navigate = useNavigate();

  const logout = async () => {
    const loggedOut = await useLogoutMutation();
    if (loggedOut) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <DayswapsButton onClick={logout}>
      {loading ? "Načítání..." : "Odhlásit"}
    </DayswapsButton>
  );
};

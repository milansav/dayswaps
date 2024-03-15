import { gql, useQuery } from "@apollo/client";
import { LoadingState } from "./loading-state";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ME_QUERY, Me } from "../queries/me-query";
import { useAuthMe } from "../contexts/me-context";
import { isDefined } from "../helpers/is-defined";

type AuthWrapperProps = {
  children?: React.ReactNode;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const [me, setMe] = useAuthMe();

  // TODO: Create type safe wrapper for useQuery
  const { loading } = useQuery<Me>(ME_QUERY, {
    onCompleted: (data) => {
      if (!isDefined(data) || !isDefined(data.me)) return navigate("/login");
      setMe(data);
    },
    onError: (error) => {
      console.error(error);
      navigate("/login");
    },
  });

  return (
    <LoadingState loading={loading} onLoading={<p>loading...</p>}>
      {/* Needs to skip one tick to update state */}
      {isDefined(me) ? children : null}
    </LoadingState>
  );
};

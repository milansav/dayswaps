import React from "react";
import { isLoaded } from "../helpers/is-loaded";

type LoadingStateProps = {
  loading: boolean;
  children?: React.ReactNode;
  onLoading?: React.ReactNode;
  onError?: React.ReactNode;
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  children,
  onLoading,
  onError,
}) => {
  return isLoaded(loading) ? children : onLoading;
};

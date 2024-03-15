import { isDefined } from "../helpers/is-defined";
import { Me } from "../queries/me-query";
import React from "react";

const initialValue = undefined;

const MeContext = React.createContext<[Me | undefined, (me: Me) => void]>([
  initialValue,
  () => {},
]);

export const MeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [me, setMe] = React.useState<Me | undefined>(initialValue);
  return (
    <MeContext.Provider value={[me, setMe]}>{children}</MeContext.Provider>
  );
};

export const useAuthMe = () => {
  const context = React.useContext(MeContext);
  if (!isDefined(context)) {
    throw new Error("useMe must be used within a MeProvider");
  }
  return context;
};

// Assuming useMe is used always after AuthWrapper
export const useMe = () => {
  const context = React.useContext<[Me, (me: Me) => void]>(
    MeContext as React.Context<[Me, (me: Me) => void]>
  );

  if (!isDefined(context)) {
    throw new Error("useMe must be used within a MeProvider");
  }

  if (!isDefined(context[0])) {
    throw new Error(
      "useMe hook must be exclusively used after AuthWrapper component."
    );
  }

  return context;
};

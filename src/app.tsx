import React from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/me");
  }, [navigate]);

  return null;
};

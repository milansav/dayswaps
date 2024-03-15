import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Me } from "./pages/me/me";
import { Login } from "./pages/login";
import { useClient } from "./hooks/use-client";
import { App } from "./app";
import { MeProvider } from "./contexts/me-context";
import { AuthWrapper } from "./components/auth-wrapper";
import { MyShifts } from "./pages/my-shifts";
import { Shift } from "./pages/shift";
import { EditMe } from "./pages/me/edit";

const client = useClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/me",
    element: (
      <AuthWrapper>
        <Me />
      </AuthWrapper>
    ),
  },
  {
    path: "/me/edit",
    element: (
      <AuthWrapper>
        <EditMe />
      </AuthWrapper>
    ),
  },
  {
    path: "/me/shifts",
    element: (
      <AuthWrapper>
        <MyShifts />
      </AuthWrapper>
    ),
  },
  {
    path: "/me/shifts/:shiftId",
    element: (
      <AuthWrapper>
        <Shift />
      </AuthWrapper>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MeProvider>
        <RouterProvider router={router} />
      </MeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

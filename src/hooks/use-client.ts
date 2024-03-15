import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEnv } from "./use-env";

const httpLink = (): ApolloLink => {
  const env = useEnv();

  return createHttpLink({
    uri: env.VITE_GRAPHQL_API,
  });
};

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const useClient = () => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink()),
    cache: new InMemoryCache(),
  });

  return client;
};

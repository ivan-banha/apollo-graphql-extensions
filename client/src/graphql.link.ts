import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Operation,
  HttpLink,
} from "@apollo/client";

const extensionLink = new ApolloLink((operation: Operation, forward) => {
  // 1. This context has the query's context extensions object with variables
  const ctx1 = operation.getContext();

  operation.setContext((oldCtx: any) => {
    // 2. The oldCtx also has the query's context extensions object with variables
    return {
      ...oldCtx,
      extensions: {
        ...oldCtx.extensions,
        ["random-value-1"]: Math.random(),
      },
    };
  });

  // 3. After the setContext execution the operation still doesn't contain the extensions object with variables

  // 4. Only when I assign extensions object, the Graphql send its variables to the backend
  operation.extensions = ctx1.extensions;
  operation.extensions["random-value-2"] = Math.random();

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  includeExtensions: true,
});

export const client = new ApolloClient({
  link: ApolloLink.from([extensionLink, httpLink]),
  cache: new InMemoryCache(),
});

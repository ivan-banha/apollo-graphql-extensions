// gql: tag function parses GraphQL query strings into query documents.
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GetExtensionsPlugin } from "./get-extensions.plugin";

const typeDefs = gql`
  type Query {
    getById(id: Int!): String
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    getById: () => "Returned Data",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    GetExtensionsPlugin,
  ],
});

const startServer = async () => {
  const { url } = await server.listen();
  console.log(`Server ready at ${url}`);
};

startServer().catch((err) => console.error(err));

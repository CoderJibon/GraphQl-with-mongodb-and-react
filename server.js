import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import colors from "colors";
import dotenv from "dotenv";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { mongoDBConnection } from "./config/mongoDDConnection.js";
// environment configuration
dotenv.config();

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Run server
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 5050,
  },
});

// database configuration
mongoDBConnection();

console.log(colors.yellow(`Server running on ${url}`));

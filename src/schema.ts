import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "../graphql/typeDefinitions";
import { resolvers } from "../graphql/resolvers";

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});

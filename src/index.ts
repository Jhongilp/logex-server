import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
const port = Number(process.env.API_PORT) || 4000;
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
    },
  },
});

const yoga = createYoga({ schema });
const server = createServer(yoga);
server.listen(port, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
});

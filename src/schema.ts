import { makeExecutableSchema } from "@graphql-tools/schema";
import { prisma } from "./db";

// https://the-guild.dev/graphql/yoga-server/tutorial/basic/03-graphql-server

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
    users: [User]
    customers: [Customer]
  }
  type User {
    nit: String!
    name: String!
    customers: [Customer!]
  }

  type Customer {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    users: async () => {
      return prisma.user.findMany();
    },
    customers: async () => {
      return prisma.customer.findMany();
    },
  },

  User: {
    customers: (user: any) =>
      prisma.customer.findMany({
        where: {
          userId: user.nit,
        },
      }),
  },

  Customer: {
    user: (customer: any) =>
      prisma.user.findUnique({
        where: {
          nit: customer.userId,
        },
      }),
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});

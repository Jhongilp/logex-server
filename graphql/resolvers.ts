import { prisma } from "../src/db";

export const resolvers = {
  Query: {
    hello: () => "Hello World!",
    users: async () => {
      return prisma.user.findMany();
    },
    customers: async () => {
      return prisma.customer.findMany();
    },
  },

  Mutation: {
    createCustomer: async (
      root: any,
      { input: { name, country, city, address, userId } }: any
    ): Promise<any> => {
      console.log("input create customer: ", name, country, city, address, userId)
      return prisma.customer.create({
        data: {
          name,
          country,
          city,
          address,
          userId,
        },
      });
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

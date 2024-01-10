import { prisma } from "../src/db";

export const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    customers: async () => {
      return prisma.customer.findMany();
    },
    customer: async (_root: any, { id }: any) => {
      return prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    },
  },

  Mutation: {
    createCustomer: async (
      root: any,
      { input: { name, country, city, address, userId } }: any
    ): Promise<any> => {
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

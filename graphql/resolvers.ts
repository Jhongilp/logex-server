import { DateTimeResolver } from "graphql-scalars";
import { prisma } from "../src/db";

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    customers: async () => {
      return prisma.customer.findMany();
    },
    shippings: async (_root: any, { customerId }: any) => {
      if (customerId) {
        return prisma.shipping.findMany({
          where: {
            customerId: parseInt(customerId),
          },
        });
      }
      return prisma.shipping.findMany();
    },
    customer: async (_root: any, { id }: any) => {
      return prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    },
    shipping: async (_root: any, { id }: any) => {
      return prisma.shipping.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    },
    expos: async (_root: any, { userId }: any) => {
      return prisma.expo.findMany({
        where: {
          customer: {
            userId
          }
        }
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
    updateCustomer: async (
      root: any,
      { input: { id, name, country, city, address, userId } }: any
    ): Promise<any> => {
      return prisma.customer.update({
        where: {
          id: parseInt(id),
          userId,
        },
        data: {
          name,
          country,
          city,
          address,
          userId,
        },
      });
    },
    deleteCustomer: async (root: any, { id }: any): Promise<any> => {
      return prisma.customer.delete({
        where: {
          id: parseInt(id),
          // userId,
        },
      });
    },
    // +++ shippings
    createShipping: async (
      root: any,
      {
        input: {
          consignee,
          notify,
          country,
          city,
          transport_mode,
          address,
          contact,
          email,
          phone,
          obs,
          customerId,
        },
      }: any
    ): Promise<any> => {
      return prisma.shipping.create({
        data: {
          consignee,
          notify,
          country,
          city,
          transport_mode,
          address,
          contact,
          email,
          phone,
          obs,
          customerId,
        },
      });
    },
    updateShipping: async (
      root: any,
      {
        input: {
          id,
          consignee,
          notify,
          country,
          city,
          transport_mode,
          address,
          contact,
          email,
          phone,
          obs,
        },
      }: any
    ): Promise<any> => {
      return prisma.shipping.update({
        where: {
          id: parseInt(id),
        },
        data: {
          consignee,
          notify,
          country,
          city,
          transport_mode,
          address,
          contact,
          email,
          phone,
          obs,
        },
      });
    },
    deleteShipping: async (_root: any, { id }: any): Promise<any> => {
      return prisma.shipping.delete({
        where: {
          id: parseInt(id),
        },
      });
    },
    createExpo: async (
      root: any,
      {
        input: {
          id,
          consecutivo,
          status,
          globalProgress,
          indicatator_month,
          oc,
          createdAt,
          shippingId,
          customerId,
        },
      }: any
    ): Promise<any> => {
      return prisma.expo.create({
        data: {
          id,
          consecutivo,
          status,
          globalProgress,
          indicatator_month,
          oc,
          createdAt,
          shippingId,
          customerId,
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
    shippings: (customer: any) =>
      prisma.shipping.findMany({
        where: {
          customerId: customer.id,
        },
      }),
  },
  Expo: {
    customer: (expo: any) =>
      prisma.customer.findUnique({
        where: {
          id: expo.customerId,
        },
      }),
    shipping: (expo: any) =>
      prisma.shipping.findUnique({
        where: {
          id: expo.shippingId,
        },
      }),
  },
};

import { DateTimeResolver } from "graphql-scalars";
// import { prisma } from "../src/db";
import { GraphQLContext } from "../src/index";

export const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    companies: async (parent: any, args: any, context: GraphQLContext) => {
      return context.prisma.company.findMany();
    },
    users: async (parent: any, args: any, context: GraphQLContext) => {
      return context.prisma.user.findMany();
    },
    customers: async (parent: any, args: any, context: GraphQLContext) => {
      // console.log("[customer resolver] current user: ", context.currentUser);
      return context.prisma.customer.findMany({
        where: {
          company_nit: context.currentUser?.company_id,
        },
      });
    },
    shippings: async (
      parent: any,
      { customerId }: any,
      context: GraphQLContext
    ) => {
      if (customerId) {
        return context.prisma.shipping.findMany({
          where: {
            customerId,
          },
        });
      }
      return context.prisma.shipping.findMany();
    },
    customer: async (_root: any, { id }: any, context: GraphQLContext) => {
      return context.prisma.customer.findUnique({
        where: {
          id,
        },
      });
    },
    shipping: async (_root: any, { id }: any, context: GraphQLContext) => {
      return context.prisma.shipping.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    },
    expos: async (_root: any, { companyId }: any, context: GraphQLContext) => {
      return context.prisma.expo.findMany({
        where: {
          customer: {
            company_nit: companyId,
          },
        },
      });
    },
  },

  Mutation: {
    createUser: async (
      root: any,
      {
        input: {
          id,
          email,
          first_name,
          second_name,
          first_lastname,
          second_lastname,
          role,
          company,
        },
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      await context.prisma.company.create({
        data: {
          ...company,
          users: {
            create: [
              {
                id,
                email,
                first_name,
                second_name,
                first_lastname,
                second_lastname,
                role,
              },
            ],
          },
        },
      });
      return context.prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
    createCustomer: async (
      root: any,
      { input: { name, country, city, address } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      const companyId = context.currentUser?.company_id;
      if (!companyId) return;
      return context.prisma.customer.create({
        data: {
          name,
          country,
          city,
          address,
          company_nit: companyId,
        },
      });
    },
    updateCustomer: async (
      root: any,
      { input: { id, name, country, city, address, companyId } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.customer.update({
        where: {
          id,
          company_nit: companyId,
        },
        data: {
          name,
          country,
          city,
          address,
          company_nit: companyId,
        },
      });
    },
    deleteCustomer: async (
      root: any,
      { id }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.customer.delete({
        where: {
          id,
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
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.shipping.create({
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
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.shipping.update({
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
    deleteShipping: async (
      _root: any,
      { id }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.shipping.delete({
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
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.expo.create({
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

  Company: {
    users: (company: any, args: any, context: GraphQLContext) =>
      context.prisma.user.findMany({
        where: {
          company_id: company.nit,
        },
      }),
    customers: (company: any, args: any, context: GraphQLContext) =>
      context.prisma.customer.findMany({
        where: {
          company_nit: company.nit,
        },
      }),
  },

  User: {
    company: (user: any, args: any, context: GraphQLContext) =>
      context.prisma.company.findMany({
        where: {
          nit: user.company_nit,
        },
      }),
  },

  Customer: {
    company: (customer: any, args: any, context: GraphQLContext) =>
      context.prisma.company.findUnique({
        where: {
          nit: customer.company_nit,
        },
      }),
    shippings: (customer: any, args: any, context: GraphQLContext) =>
      context.prisma.shipping.findMany({
        where: {
          customerId: customer.id,
        },
      }),
  },
  Expo: {
    customer: (expo: any, args: any, context: GraphQLContext) =>
      context.prisma.customer.findUnique({
        where: {
          id: expo.customerId,
        },
      }),
    shipping: (expo: any, args: any, context: GraphQLContext) =>
      context.prisma.shipping.findUnique({
        where: {
          id: expo.shippingId,
        },
      }),
  },
};

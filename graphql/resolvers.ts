import { DateTimeResolver } from "graphql-scalars";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "../src/index";
import { initialExpoSettingList } from "../src/app_constants";

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
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }
      const allCustomers = await context.prisma.customer.findMany({
        where: {
          company_nit: context.currentUser?.company_id,
        },
      });

      context.pubSub.publish("onCustomerUpdates", { customers: allCustomers });
      return allCustomers;
    },
    shippings: async (
      parent: any,
      { customerId }: any,
      context: GraphQLContext
    ) => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }
      if (!customerId) {
        return new GraphQLError("customerId needs to be provided");
      }
      const allShippings = await context.prisma.shipping.findMany({
        where: {
          customerId,
        },
      });
      context.pubSub.publish("onShippingUpdates", {
        shippings: allShippings,
      });
      return allShippings;
    },
    customer: async (_root: any, { id }: any, context: GraphQLContext) => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }

      return context.prisma.customer.findUnique({
        where: {
          id,
          company_nit: context.currentUser?.company_id,
        },
      });
    },
    shipping: async (_root: any, { id }: any, context: GraphQLContext) => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }
      return context.prisma.shipping.findUnique({
        where: {
          id,
        },
      });
    },
    expos: async (_root: any, args: any, context: GraphQLContext) => {
      return context.prisma.expo.findMany({
        where: {
          customer: {
            company_nit: context.currentUser?.company_id,
          },
        },
      });
    },
    defaultExpoActivities: async (
      _root: any,
      args: any,
      context: GraphQLContext
    ) => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      return context.prisma.defaultExpoActivity.findMany({
        where: {
          company_nit: context.currentUser?.company_id,
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
      try {
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

        const companyActivities = initialExpoSettingList.map((activity) => {
          return {
            ...activity,
            company_nit: company.nit,
          };
        });

        await context.prisma.defaultExpoActivity.createMany({
          data: companyActivities,
        });
        return context.prisma.user.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log("error creating company: ", error);
      }
    },
    createCustomer: async (
      root: any,
      { input: { name, country, city, address } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      const companyId = context.currentUser?.company_id;

      if (!companyId) return;
      const newCustomer = await context.prisma.customer.create({
        data: {
          name,
          country,
          city,
          address,
          company_nit: companyId,
        },
      });
      const allCustomers = await context.prisma.customer.findMany({
        where: {
          company_nit: context.currentUser?.company_id,
        },
      });
      context.pubSub.publish("onCustomerUpdates", { customers: allCustomers });
      return newCustomer;
    },
    updateCustomer: async (
      root: any,
      { input: { id, name, country, city, address } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }

      return context.prisma.customer.update({
        where: {
          id,
        },
        data: {
          name,
          country,
          city,
          address,
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
      const newShipping = await context.prisma.shipping.create({
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
      const allShippings = await context.prisma.shipping.findMany();
      context.pubSub.publish("onShippingUpdates", { shippings: allShippings });
      return newShipping;
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
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }
      const updatedShipping = await context.prisma.shipping.update({
        where: {
          id,
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
      const allShippings = await context.prisma.shipping.findMany();
      context.pubSub.publish("onShippingUpdates", { shippings: allShippings });
      return updatedShipping;
    },
    deleteShipping: async (
      _root: any,
      { id }: any,
      context: GraphQLContext
    ): Promise<any> => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }
      const deletedShipping = await context.prisma.shipping.delete({
        where: {
          id,
        },
      });
      const allShippings = await context.prisma.shipping.findMany();
      context.pubSub.publish("onShippingUpdates", { shippings: allShippings });
      return deletedShipping;
    },
    createExpo: async (
      root: any,
      {
        input: {
          consecutivo,
          status,
          globalProgress,
          // createdAt,
          shippingId,
          customerId,
        },
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      return context.prisma.expo.create({
        data: {
          consecutivo,
          status,
          globalProgress,
          createdAt: new Date().toISOString(),
          shippingId,
          customerId,
        },
      });
    },
    createDefaultActivities: async (
      root: any,
      { input: { activities } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      // TODO add auth control
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }

      try {
        await context.prisma.defaultExpoActivity.createMany({
          data: activities,
        });
        const defaultActivities = context.prisma.defaultExpoActivity.findMany({
          where: {
            company_nit: context.currentUser?.company_id,
          },
        });
        return defaultActivities;
      } catch (error) {
        console.log("[default activity] error: ", error);
      }
    },
  },

  Subscription: {
    customers: {
      subscribe: (parent: unknown, args: {}, context: GraphQLContext) =>
        context.pubSub.subscribe("onCustomerUpdates"),
    },
    shippings: {
      subscribe: (parent: unknown, args: {}, context: GraphQLContext) =>
        context.pubSub.subscribe("onShippingUpdates"),
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

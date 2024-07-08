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
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      return context.prisma.expo.findMany({
        where: {
          company_nit: context.currentUser?.company_id,
        },
      });
    },
    expo: async (_root: any, { id }: any, context: GraphQLContext) => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      // console.log("[get expo] args: ", args);
      return context.prisma.expo.findUnique({
        where: {
          consecutivo: id,
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
    containersByBooking: async (
      parent: any,
      { bookingId }: any,
      context: GraphQLContext
    ) => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      if (!bookingId) {
        return new GraphQLError("bookingId needs to be provided");
      }
      return await context.prisma.container.findMany({
        where: {
          bookingId,
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
          // @ts-ignore
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

    // +++ expo
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
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }

      const defaultActivities =
        await context.prisma.defaultExpoActivity.findMany({
          where: {
            company_nit: context.currentUser.company_id,
          },
        });
      const expoTodoActivities = defaultActivities.map((activity) => {
        const { id, ...expoTodoInput } = activity;
        return expoTodoInput;
      });

      return context.prisma.expo.create({
        data: {
          company_nit: context.currentUser.company_id,
          consecutivo,
          status,
          globalProgress,
          createdAt: new Date().toISOString(),
          shippingId,
          customerId,
          todoList: {
            create: expoTodoActivities,
          },
        },
      });

      // after expo is created, create the ExpoTodoActivities
    },

    // +++ activities
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
    updateDefaultExpoActivity: async (
      root: any,
      {
        input: { id, name, status, progress, responsible, optional, enabled },
      }: any,
      context: GraphQLContext
    ): Promise<any> => {
      if (!context?.currentUser) {
        return new GraphQLError("Unauthorized user");
      }

      const updatedDefaultExpoActivity =
        await context.prisma.defaultExpoActivity.update({
          where: {
            id: parseInt(id),
            company_nit: context.currentUser.company_id,
          },
          data: {
            name,
            status,
            progress,
            responsible,
            optional,
            enabled,
          },
        });
      return updatedDefaultExpoActivity;
    },
    updateTodoExpoActivity: async (
      root: any,
      { input: { activity, status, globalProgress } }: any,
      context: GraphQLContext
    ): Promise<any> => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      console.log(
        "[updateTodoExpoActivity] status, globalProgress: ",
        status,
        globalProgress,
        activity
      );
      const expoId = activity.expoId;
      delete activity.expoId; // still don't know why this is necessary. Primas should be able to handle this. I guess is something related to the relation between expo and todoList
      return await context.prisma.expo.update({
        where: {
          consecutivo: expoId,
          company_nit: context.currentUser?.company_id,
          // company_nit: "88888888",
        },
        data: {
          status,
          globalProgress,
          todoList: {
            updateMany: {
              where: {
                id: activity.id,
              },
              data: {
                ...activity,
              },
            },
          },
        },
      });
    },
    createBooking: async (
      root: any,
      { input }: any,
      context: GraphQLContext
    ): Promise<any> => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      // console.log("[createBooking] input: ", );
      return context.prisma.booking.create({
        data: {
          ...input,
        },
      });
    },
    updateBooking: async (
      root: any,
      { input }: any,
      context: GraphQLContext
    ): Promise<any> => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      // console.log("[createBooking] input: ", );
      return context.prisma.booking.update({
        where: {
          id: input.id,
          expoId: input.expoId,
        },
        data: {
          ...input,
        },
      });
    },
    createContainer: async (
      root: any,
      { input }: any,
      context: GraphQLContext
    ): Promise<any> => {
      // if (!context?.currentUser) {
      //   return new GraphQLError("Unauthorized user");
      // }
      // console.log("[createBooking] input: ", );
      console.log("[createContainer] input: ", input);
      return context.prisma.container.create({
        data: {
          ...input,
        },
      });
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
    booking: (expo: any, args: any, context: GraphQLContext) =>
      context.prisma.booking.findUnique({
        where: {
          expoId: expo.consecutivo,
        },
      }),

    todoList: (expo: any, args: any, context: GraphQLContext) =>
      context.prisma.expoTodoActivity.findMany({
        where: {
          expoId: expo.id,
        },
      }),
  },
};

import { createPubSub } from "@graphql-yoga/subscription";
import { Customer, Shipping } from "@prisma/client";

// 1
export type PubSubChannels = {
  onCustomerUpdates: [{ customers: Customer[] }];
  onShippingUpdates: [{ shippings: Shipping[] }];
};

// 2
export const pubSub = createPubSub<PubSubChannels>();

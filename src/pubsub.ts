import { createPubSub } from "@graphql-yoga/subscription";
import { Customer } from "@prisma/client";

// 1
export type PubSubChannels = {
  onCustomerUpdates: [{ customers: Customer[] }];
};

// 2
export const pubSub = createPubSub<PubSubChannels>();

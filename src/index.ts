import { createServer } from "node:http";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { schema } from "./schema";
import { PrismaClient, User } from "@prisma/client";
import { prisma } from "./db";
import { authenticateUser } from "./auth";
import { pubSub } from './pubsub'
 

export type GraphQLContext = {
  prisma: PrismaClient;
  currentUser: null | User;
  pubSub: typeof pubSub;
};

function main() {
  const yoga = createYoga({
    schema,
    context: async ({ request }): Promise<GraphQLContext> => {
      console.log("[contetx] request: ", request.headers.get("authorization"));
      return {
        prisma,
        currentUser: await authenticateUser(prisma, request),
        pubSub
      };
    },
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();

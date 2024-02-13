import { createServer } from "node:http";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { schema } from "./schema";
import { PrismaClient, User } from "@prisma/client";
import { prisma } from "./db";
import { authenticateUser } from "./auth";

export type GraphQLContext = {
  prisma: PrismaClient;
  currentUser: null | User;
};

export async function createContext(
  initialContext: YogaInitialContext
): Promise<GraphQLContext> {
  return {
    prisma,
    currentUser: await authenticateUser(prisma, initialContext.request),
  };
}

function main() {
  const yoga = createYoga({
    schema,
    context: async ({ request }): Promise<GraphQLContext> => {
      return {
        prisma,
        currentUser: await authenticateUser(prisma, request),
      };
    },
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();

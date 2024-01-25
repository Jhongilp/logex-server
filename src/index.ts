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

// add authenticated user using this guide
// https://the-guild.dev/graphql/yoga-server/tutorial/advanced/01-authentication

// from client to pass the token
// https://formidable.com/open-source/urql/docs/advanced/authentication/

/**
 * authenticated users
 *
 * - create signup resolver
 *    -- the args must have the user company info AND the user id from Supabase auth table
 *    -- save user info in postgress User table
 *
 * - validate that the request are coming from valid users
 *    -- compare the auth user id request with the User table
 */

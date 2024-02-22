import { jwtDecode } from "jwt-decode";
import { PrismaClient, User } from "@prisma/client";

export async function authenticateUser(
  prisma: PrismaClient,
  request: Request
): Promise<User | null> {
  const header = request.headers.get("authorization");
  if (header !== null) {
    const token = header.split(" ")[1];
    const tokenPayload = jwtDecode(token);
    // console.log("[auth user] token payload: ", tokenPayload);
    const userId = tokenPayload?.sub;
    console.log("[auth] user id: ", userId);
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  return null;
}

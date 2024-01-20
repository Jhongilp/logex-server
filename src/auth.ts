// import { JwtPayload, verify } from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";
import { PrismaClient, User } from "@prisma/client";

export async function authenticateUser(
  prisma: PrismaClient,
  request: Request
): Promise<User | null> {
  // console.log("[auth user] request headers: ", request.headers);
  const header = request.headers.get('authorization')
  return await prisma.user.findUnique({ where: { id: "28dc3632-4ae9-4048-9ea1-83d5c7f62f6c" } }); // TODO replace with user id
  // if (header !== null) {
  //   // 1
  //   const token = header.split(' ')[1]
  //   // 2
  //   const tokenPayload = jwtDecode(token);
  //   // 3
  //   // const userId = tokenPayload.userId
  //   console.log("[auth user] token payload");
  //   // 4
  //   // return await prisma.user.findUnique({ where: { id: userId } })
  //   return await prisma.user.findUnique({ where: { id: "28dc3632-4ae9-4048-9ea1-83d5c7f62f6c" } }); // TODO replace with user id
  // }
 
  return null
}
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.expo.deleteMany({});
  await prisma.shipping.deleteMany({});

  // await prisma.company.create({
  //   data: {
  //     nit: "8306953658",
  //     name: "PACIFIC FRUITS SAS",
  //     country: "COLOMBIA",
  //     city: "CALI",
  //     users: {
  //       create: [
  //         {
  //           id: "28dc3632-4ae9-4048-9ea1-83d5c7f62f6c",
  //           email: "testing@pafici.com",
  //           first_name: "Linda",
  //           first_lastname: "Hernandez",
  //         },
  //       ],
  //     },
  //     customer: {
  //       create: [
  //         {
  //           name: "FRUTAS DE ESPAÑA",
  //           country: "ESPAÑA",
  //           city: "MADRID",
  //           address: "CALLE MADRID 100",
  //         },
  //         {
  //           name: "HOLLAND FRUITS",
  //           country: "PAISES BAJOS",
  //           city: "AMSTERDAM",
  //           address: "AHTS SDSDJK",
  //         },
  //       ],
  //     },
  //   },
  // });
}

main().then(() => {
  console.log("Data seeded...");
});

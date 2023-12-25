import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.expo.deleteMany({});
  await prisma.shipping.deleteMany({});

  await prisma.user.create({
    data: {
      name: "PACIFIC FRUITS SAS",
      nit: "8009653658",
      customer: {
        create: [
          {
            name: "FRUTAS DE ESPAÑA",
            country: "ESPAÑA",
            city: "MADRID",
            address: "CALLE MADRID 100",
          },
          {
            name: "HOLLAND FRUITS",
            country: "PAISES BAJOS",
            city: "AMSTERDAM",
            address: "AHTS SDSDJK",
          },
        ],
      },
    },
  });

  // prisma.expo.create({
  //   data: {
  //     consecutivo: "EXP-101",
  //     destination_country: "ESPAÑA",
  //     globalProgress: 0,
  //     indicatator_month: 1,
  //     oc: "",
  //     puerto_destino: "BILBAO",
  //     status: 1,
  //     transport_mode: 1,
  //     selected_shipping: "",
  //     userId: "8009653658",
  //     customerId: 1,
  //   },
  // });
}

main().then(() => {
  console.log("Data seeded...");
});

import { builder } from "../builder";

builder.prismaObject("Customer", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.exposeString("name"),
    country: t.exposeString("country"),
    city: t.exposeString("city"),
    address: t.exposeString("address"),
    shippings: t.relation("shippings"),
    expos: t.relation("expos"),
    user: t.relation("user"),
  }),
});

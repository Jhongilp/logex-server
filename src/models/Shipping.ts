import { builder } from "../builder";

builder.prismaObject("Shipping", {
  fields: (t) => ({
    id: t.exposeID("id"),
    consignee: t.exposeString("consignee"),
    notify: t.exposeString("notify"),
    country: t.exposeString("country"),
    city: t.exposeString("city"),
    transport_mode: t.exposeString("transport_mode"),
    address: t.exposeString("address"),
    contact: t.exposeString("contact"),
    email: t.exposeString("email"),
    phone: t.exposeString("phone"),
    obs: t.exposeString("obs"),
    customer: t.relation("customer"),
  }),
});

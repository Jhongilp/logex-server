import { builder } from "../builder";

builder.prismaObject("Expo", {
  fields: (t) => ({
    id: t.exposeID("id"),
    consecutivo: t.exposeString("consecutivo"),
    destination_country: t.exposeString("destination_country"),
    puerto_destino: t.exposeString("puerto_destino"),
    transport_mode: t.exposeInt("transport_mode"),
    selected_shipping: t.exposeString("selected_shipping"),
    status: t.exposeInt("status"),
    globalProgress: t.exposeInt("globalProgress"),
    indicatator_month: t.exposeInt("indicatator_month"),
    oc: t.exposeString("oc"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    user: t.relation("user"),
    customer: t.relation("customer"),
    // customerId: t.exposeInt("customerId"),
    // userId
  }),
});

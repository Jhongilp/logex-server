import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    nit: t.exposeString("nit"),
    name: t.exposeString("name"),
    exports: t.relation("exports"),
    customer: t.relation("customer"),
  }),
});

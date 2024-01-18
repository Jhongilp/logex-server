import { DateTimeTypeDefinition } from "graphql-scalars";
// https://the-guild.dev/graphql/yoga-server/tutorial/basic/03-graphql-server

export const typeDefinitions = /* GraphQL */ `
  ${DateTimeTypeDefinition}
  type Query {
    time: DateTime
    companies: [Company]
    users: [User]
    customers: [Customer]
    customer(id: ID!): Customer
    shippings(customerId: ID): [Shipping] # if not customerId provided return all shippings
    shipping(id: ID!): Shipping
    expos(companyId: ID!): [Expo]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    createCustomer(input: CreateCustomerInput): Customer
    updateCustomer(input: UpdateCustomerInput): Customer
    deleteCustomer(id: ID!): Customer
    createShipping(input: CreateShippingInput): Shipping
    updateShipping(input: UpdateShippingInput): Shipping
    deleteShipping(id: ID!): Shipping
    createExpo(input: CreateExpoInput): Expo
  }

  type Company {
    nit: String
    name: String
    country: String
    city: String
    users: [User!]!
    customers: [Customer]
  }

  type User {
    id: ID!
    name: String!
    email: String
    company: Company!
  }

  type Customer {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
    # user: User!
    company: Company!
    shippings: [Shipping!]
  }

  type Shipping {
    id: ID!
    consignee: String
    notify: String
    country: String
    city: String
    transport_mode: String
    address: String
    contact: String
    email: String
    phone: String
    obs: String
    customerId: Int
  }

  type Expo {
    id: ID!
    consecutivo: String
    status: Int
    globalProgress: Int
    indicatator_month: Int
    oc: String
    createdAt: DateTime
    shipping: Shipping
    customer: Customer
  }

  input CreateUserInput {
    id: ID!
    nit: String!
    name: String!
  }

  input CreateCustomerInput {
    name: String!
    country: String!
    city: String!
    address: String!
    companyId: String!
  }

  input UpdateCustomerInput {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
    companyId: String!
  }

  input CreateShippingInput {
    consignee: String
    notify: String
    country: String
    city: String
    transport_mode: String
    address: String
    contact: String
    email: String
    phone: String
    obs: String
    customerId: Int
  }
  input UpdateShippingInput {
    id: ID!
    consignee: String
    notify: String
    country: String
    city: String
    transport_mode: String
    address: String
    contact: String
    email: String
    phone: String
    obs: String
  }
  input CreateExpoInput {
    consecutivo: String
    status: Int
    globalProgress: Int
    indicatator_month: Int
    oc: String
    createdAt: DateTime
    shippingId: Int
    customerId: Int
  }
`;

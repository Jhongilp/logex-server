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
    expos: [Expo]
    defaultExpoActivities: [DefaultExpoActivity]
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
    createDefaultActivities(
      input: CreateDefaultActivitiesInput
    ): [DefaultExpoActivity]
  }

  type Subscription {
    customers: [Customer]
    shippings: [Shipping]
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
    first_name: String
    second_name: String
    first_lastname: String
    second_lastname: String
    role: Int
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
    customerId: String
  }

  type Expo {
    id: ID!
    consecutivo: String
    status: Int
    globalProgress: Int
    createdAt: DateTime
    shipping: Shipping
    customer: Customer
  }

  type DefaultExpoActivity {
    id: ID!
    name: String
    status: String
    progress: String
    responsible: String
    optional: Boolean
    enabled: Boolean
  }

  input CreateCompanyInput {
    nit: String
    name: String
    country: String
    city: String
  }

  input CreateUserInput {
    id: ID!
    email: String!
    first_name: String!
    second_name: String
    first_lastname: String!
    second_lastname: String
    role: Int
    company: CreateCompanyInput
  }

  input CreateCustomerInput {
    name: String!
    country: String!
    city: String!
    address: String!
    # companyId: String! # we don't need this since Auth user will provide the companyId
  }

  input UpdateCustomerInput {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
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
    customerId: String
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
    shippingId: String
    customerId: String
  }
  input DefaultExpoActivityInput {
    name: String
    status: String
    progress: String
    responsible: String
    optional: Boolean
    enabled: Boolean
  }
  input CreateDefaultActivitiesInput {
    activities: [DefaultExpoActivityInput]
  }
`;

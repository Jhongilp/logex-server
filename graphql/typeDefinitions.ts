// https://the-guild.dev/graphql/yoga-server/tutorial/basic/03-graphql-server

export const typeDefinitions = /* GraphQL */ `
  type Query {
    users: [User]
    customers: [Customer]
    customer(id: ID!): Customer
    shippings(customerId: ID): [Shipping] # if not customerId provided return all shippings
    shipping(id: ID!): Shipping
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput): Customer
    updateCustomer(input: UpdateCustomerInput): Customer
    deleteCustomer(id: ID!): Customer
    createShipping(input: CreateShippingInput): Shipping
    updateShipping(input: UpdateShippingInput): Shipping
    deleteShipping(id: ID!): Shipping
  }

  type User {
    nit: String!
    name: String!
    customers: [Customer!]
  }

  type Customer {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
    user: User!
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

  input CreateCustomerInput {
    name: String!
    country: String!
    city: String!
    address: String!
    userId: String!
  }

  input UpdateCustomerInput {
    id: ID!
    name: String!
    country: String!
    city: String!
    address: String!
    userId: String!
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
`;

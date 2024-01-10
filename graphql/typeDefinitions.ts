// https://the-guild.dev/graphql/yoga-server/tutorial/basic/03-graphql-server

export const typeDefinitions = /* GraphQL */ `
  type Query {
    users: [User]
    customers: [Customer]
    customer(id: ID!): Customer
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput): Customer
    updateCustomer(input: UpdateCustomerInput): Customer
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
`;

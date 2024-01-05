// https://the-guild.dev/graphql/yoga-server/tutorial/basic/03-graphql-server

export const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
    users: [User]
    customers: [Customer]
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput): Customer
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
`;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type Vendor {
    _id: ID
    name: String
    email: String
    location: String
    services: String
    description: String
    cost: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUserById(userId: ID!): User
    me: User
    getVendors: [Vendor!]!
    getVendorsLocations: [String!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;


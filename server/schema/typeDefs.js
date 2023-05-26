const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    usertype: Usertype
  }

  enum Usertype {
    Vendor
    Customer
  }

  type Vendor {
    _id: ID!
    name: String
    location: String
    description: String
    services: [Service]
  }

  type Customer {
    _id: ID!
    name: String
    location: String
    preferedVendors: [Vendor]
    savedExperiences: [SavedService]
  }

  type SavedService {
    _id: ID!
    vendor: Vendor
    service: Service
  }

  type Service {
    _id: ID!
    name: String
    description: String
    price: Float
    duration: Int
    category: String
    images: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUserById(userId: ID!): User
    me: User
    getVendorsLocations: [String]
    getCustomers: [Customer!]!
    getVendors: [Vendor!]!
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      usertype: Usertype!
    ): Auth

    addingInfoVendor(location: String, description: String): Vendor

    addingInfoCustomer(location: String): Customer

    createService(
      name: String!
      description: String
      price: Float
      duration: Int
      category: String
    ): Vendor

    saveService(serviceId: ID!): Customer
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

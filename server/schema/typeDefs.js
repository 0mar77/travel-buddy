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
    savedExperiences: [Service]
  }

  type Service {
    _id: ID
    name: String
    description: String
    price: Float
    duration: Int
    category: String
    images: [String]
    vendor: Vendor
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
    getCustomerById(userId: ID!): Customer
    getVendorById(userId: ID!): Vendor
    getServices: [Service]
  }

  type DeleteServiceResponse {
    success: Boolean
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
      vendorId: ID!
      name: String!
      description: String
      price: Float
      duration: Int
      category: String
    ): Vendor

    deleteService(service: ID!): DeleteServiceResponse

    saveService(serviceId: ID!): Customer
    unsaveService(serviceId: ID!): Customer
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

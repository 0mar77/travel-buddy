import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        usertype
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $usertype: Usertype!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      usertype: $usertype
    ) {
      token
      user {
        _id
        username
        email
        usertype
      }
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation createService(
    $name: String!
    $description: String
    $price: Float
    $duration: Int
    $category: String
  ) {
    createService(
      name: $name
      description: $description
      price: $price
      duration: $duration
      category: $category
    ) {
      _id
      location
      description
      name
      services {
        _id
        category
        description
        duration
        name
        price
      }
    }
  }
`;

export const ADD_CUSTOMER_INFO = gql`
  mutation ($location: String) {
    addingInfoCustomer(location: $location) {
      _id
      name
      location
    }
  }
`;

export const ADD_VENDOR_INFO = gql`
  mutation ($location: String, $description: String) {
    addingInfoVendor(location: $location, description: $description) {
      _id
      name
      location
      description
    }
  }
`;

export const SAVE_SERVICE = gql`
  mutation ($serviceId: ID!) {
    saveService(serviceId: $serviceId) {
      _id
      name
      savedExperiences {
        _id
        vendor {
          _id
          name
          location
        }
      }
    }
  }
`;

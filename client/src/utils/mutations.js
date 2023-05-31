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
    $vendorId: ID!
    $name: String!
    $description: String
    $price: Float
    $duration: Int
    $category: String
  ) {
    createService(
      vendorId: $vendorId
      name: $name
      description: $description
      price: $price
      duration: $duration
      category: $category
    ) {
      _id
      name
      description
      location
      services {
        _id
        name
        description
        price
        duration
        category
        images
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
  mutation saveService($serviceId: ID!) {
    saveService(serviceId: $serviceId) {
      _id
      name
      location
      savedExperiences {
        _id
        name
        description
        price
        duration
        category
        images
        vendor {
          _id
          name
          location
          description
        }
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation deleteService($service: ID!) {
    deleteService(service: $service) {
      success
    }
  }
`;

export const UNSAVE_SERVICE = gql`
  mutation unsaveService($serviceId: ID!) {
    unsaveService(serviceId: $serviceId) {
      _id
      name
      location
      savedExperiences {
        _id
        name
        description
        price
        duration
        category
        images
        vendor {
          _id
          name
          location
          description
        }
      }
    }
  }
`;

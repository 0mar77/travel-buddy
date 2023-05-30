import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      usertype
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
      usertype
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
      usertype
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query getCustomers {
    getCustomers {
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

export const GET_CUSTOMER_BY_ID = gql`
  query getCustomerById($userId: ID!) {
    getCustomerById(userId: $userId) {
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

export const GET_VENDORS = gql`
  query getVendors {
    getVendors {
      _id
      name
      location
      description
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

export const GET_VENDOR_BY_ID = gql`
  query getVendorById($userId: ID!) {
    getVendorById(userId: $userId) {
      _id
      name
      location
      description
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

export const GET_VENDORS_LOCATIONS = gql`
  query getVendorsLocations {
    getVendorsLocations
  }
`;

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
      preferedVendors {
        _id
        name
        location
        description
      }
      savedExperiences {
        _id
        service {
          _id
          name
          description
          price
          duration
          category
          images
        }
        vendor {
          _id
          name
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

export const GET_VENDORS_LOCATIONS = gql`
  query getVendorsLocations {
    getVendorsLocations
  }
`;

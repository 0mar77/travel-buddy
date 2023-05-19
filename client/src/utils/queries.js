import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const GET_VENDORS = gql`
  query getVendors {
    getVendors {
      _id
      name
      email
      location
      services
      description
      cost
    }
  }
`;

export const GET_VENDORS_LOCATIONS = gql`
  query getVendorsLocations {
    getVendorsLocations
  }
`;

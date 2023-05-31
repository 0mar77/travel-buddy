import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMER_BY_ID } from '../utils/queries';

const CustomerInfo = ({ profileId }) => {
  const { loading, data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { userId: profileId },
  });
  if (loading) {
    return <p>Loading info...</p>;
  }

  const customer = data.getCustomerById;

  console.log(customer);

  return (
    <div className="h-screen w-auto bg-customSections">
      <div className="flex-row justify-space-between my-2 bg-customComplementary">
        <h3 className="card-header text-customPrimary bg-customComplementary p-2 my-2">
          {customer.name}'s Location:
        </h3>
        <p className="text-customText p-2 my-2">{customer.location}</p>
      </div>
    </div>
  );
};

export default CustomerInfo;

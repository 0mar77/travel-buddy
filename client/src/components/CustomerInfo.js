import React from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMER_BY_ID } from "../utils/queries";

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
    <div>
      <div className="flex-row justify-space-between my-4">
        <h4 className="card-header bg-dark text-light p-2 m-0">
          {customer.name}'s Location: {customer.location}
        </h4>
      </div>
    </div>
  );
};

export default CustomerInfo;

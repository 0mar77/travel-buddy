import React from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_VENDOR_BY_ID } from "../utils/queries";
import { DELETE_SERVICE } from "../utils/mutations";

const VendorInfo = ({ profileId }) => {
  const [deleteService] = useMutation(DELETE_SERVICE);
  const { loading, data } = useQuery(GET_VENDOR_BY_ID, {
    variables: { userId: profileId },
  });
  if (loading) {
    return <p>Loading info...</p>;
  }

  const vendor = data.getVendorById;

  // console.log(vendor);

  const handleDelete = (serviceId) => {
    try {
      const deletedService = deleteService({
        variables: { service: serviceId },
      });

      if (!deletedService) {
        return "No service founded with this ID";
      }

      console.log(deletedService);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        <h4 className="card-header bg-dark text-light p-2 m-0">
          {vendor.name}'s Location: {vendor.location}
        </h4>
        <h4 className="card-header bg-dark text-light p-2 m-0">
          {vendor.name}'s Description: {vendor.description}
        </h4>
        {vendor.services &&
          vendor.services.map((service) => (
            <div key={service._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Name: {service.name}
                </h5>
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Description: {service.description}
                </h5>
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Price: {service.price}
                </h5>
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Duration: {service.duration}
                </h5>
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Category: {service.category}
                </h5>
                <h5 className="card-header bg-dark text-light p-2 m-0">
                  Service Images: {service.images}
                </h5>
              </div>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VendorInfo;

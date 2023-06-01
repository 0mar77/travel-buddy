import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_VENDOR_BY_ID } from '../utils/queries';
import { DELETE_SERVICE } from '../utils/mutations';

const VendorInfo = ({ profileId }) => {
  const [deleteService] = useMutation(DELETE_SERVICE);
  const { loading, data } = useQuery(GET_VENDOR_BY_ID, {
    variables: { userId: profileId },
  });
  if (loading) {
    return <p>Loading info...</p>;
  }

  const vendor = data.getVendorById;


  const handleDelete = (serviceId) => {
    try {
      const deletedService = deleteService({
        variables: { service: serviceId },
      });

      if (!deletedService) {
        return 'No service founded with this ID';
      }

      console.log(deletedService);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-customText ">
      <div className="flex flex-row my-4 justify-evenly">
        <h4 className="w-1/2 p-2 m-2 text-customPrimary border-2 border-customComplementary bg-customSections">
          {vendor.name}'s Location:
          <p className="text-customText text-sm my-4">{vendor.location}</p>
        </h4>
        <h4 className="w-1/2 text-customPrimary p-2 m-2 border-2 border-customComplementary bg-customSections">
          {vendor.name}'s Description:
          <p className="text-customText text-sm my-4">{vendor.description}</p>
        </h4>
        {vendor.services &&
          vendor.services.map((service) => (
            <div key={service._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Name: {service.name}
                </h5>
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Description: {service.description}
                </h5>
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Price: {service.price}
                </h5>
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Duration: {service.duration}
                </h5>
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Category: {service.category}
                </h5>
                <h5 className="bg-dark text-light p-2 m-0">
                  Service Images: {service.images}
                </h5>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(service._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VendorInfo;

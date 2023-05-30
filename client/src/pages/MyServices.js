import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_VENDORS } from "../utils/queries";
import { SAVE_SERVICE } from "../utils/mutations";
import Auth from "../utils/auth";

const VendorList = () => {
  const [saveService, { error }] = useMutation(SAVE_SERVICE);
  const { loading: vendorsLoading, data: vendorsData } = useQuery(GET_VENDORS);
  const vendors = vendorsData?.getVendors || [];

  let userData = {};
  const { data: meData } = useQuery(GET_ME, { skip: !Auth.loggedIn() });

  if (Auth.loggedIn()) {
    userData = meData?.me || {};
  }

  if (vendorsLoading) {
    return <p>Loading vendors...</p>;
  }

  const handleSaveService = async (event, serviceId) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const data = await saveService({
        variables: { serviceId: serviceId },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      {vendors.map((vendor) => (
        <div key={vendor._id} className="mb-4">
          <h3 className="text-lg font-semibold">{vendor.name}</h3>
          <p>Location: {vendor.location}</p>
          <p>Description: {vendor.description}</p>
          {userData.usertype === "Customer" && (
            <>
              {vendor.services.map((service, index) => (
                <div key={service._id} className="mt-2">
                  <p>Service: {service.name}</p>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={(event) => handleSaveService(event, service._id)}
                  >
                    Save this service
                  </button>
                </div>
              ))}
            </>
          )}
          {userData.usertype !== "Customer" && (
            <>
              {vendor.services.map((service, index) => (
                <div key={service._id} className="mt-2">
                  <p>Service: {service.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default VendorList;
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_VENDORS } from '../utils/queries';
import { SAVE_SERVICE } from '../utils/mutations';
import Auth from '../utils/auth';
import StaticVendor from '../components/Static-Vendors/StaticVendors';
import Adventure from '../images/adventure.webp'


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
    <div className="bg-customBody h-screen p-2">
      <h1 className="text-customPrimary text-center  text-5xl my-5">Vendors</h1>
      {<StaticVendor />}
      <div className='flex flex-wrap m-4'>
        {vendors.map((vendor) => (
          <div
            className="border-2 border-customComplementary p-2 my-3 bg-customSections text-customText card-container card"
            key={vendor._id}
          >
            <img src={Adventure} />
            <h3 className="text-customPrimary my-1">{vendor.name}</h3>
            <p className="text-white my-1">Location: {vendor.location}</p>
            <p className="text-white my-1">Description: {vendor.description}</p>
            <p>Phone Number: (123) 456 7890</p>
            {userData.usertype === 'Customer' && (
              <>
                {vendor.services.map((service, index) => (
                  <div key={service._id}>
                    <p>Service: {service.name}</p>
                    <button
                      onClick={(event) => handleSaveService(event, service._id)}
                    >
                      Save this service
                    </button>
                  </div>
                ))}
              </>
            )}
            {userData.usertype !== 'Customer' && (
              <>
                {vendor.services.map((service, index) => (
                  <div key={service._id}>
                    <p>Service: {service.name}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;

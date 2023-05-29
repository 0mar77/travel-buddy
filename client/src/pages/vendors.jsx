import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VENDORS } from '../utils/queries.js';
import VenderCard from '../components/User-Post/Post.jsx';

const VendorList = () => {
  // This will be used after image uploading is solved

  // const { loading, data } = useQuery(GET_VENDORS);

  // if (loading) {
  //   return <p>Loading vendors...</p>;
  // }

  // const vendors = data.getVendors;

  // return (
  //   <div>
  //     <h1>Vendors</h1>
  //     {vendors.map((vendor) => (
  //       <div key={vendor._id}>
  //         <h3>{vendor.name}</h3>
  //         <p>Email: {vendor.email}</p>
  //         <p>Location: {vendor.location}</p>
  //         <p>Services: {vendor.services}</p>
  //         <p>Description: {vendor.description}</p>
  //         <p>Cost: {vendor.cost}</p>
  //       </div>
  //     ))}
  //   </div>
  // );

  
  return (
      <div>
        <h1>Vendors</h1>
        <div className='m-10'>
          <VenderCard />
        </div>
      </div>
  );

};

export default VendorList;

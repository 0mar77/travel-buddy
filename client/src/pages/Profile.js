import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import VendorInfo from '../components/VendorInfo';
import EditVendorInfo from '../components/EditVendorInfo';
import ServiceForm from '../components/ServiceForm';
import CustomerInfo from '../components/CustomerInfo';
import EditCustomerInfo from '../components/EditCustomerInfo';

import { GET_USER_BY_ID } from '../utils/queries';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId: profileId },
  });

  const profile = data?.getUserById || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(profile);
  return (
    <div className="container bg-customBody p-2">
      <h2 className="card-header text-customPrimary p-2 ">
        {profile.username}'s information
      </h2>

      {/* {profile.skills?.length > 0 && <SkillsList skills={profile.skills} />} */}
      {profile.usertype === 'Vendor' && (
        <>
          <div className="container flex flex-col">
            <div className="my-4 p-4 border-2 border-customComplementary w-full bg-customSections text-customText">
              <VendorInfo profileId={profile._id} />
            </div>
            <div className="my-4 p-4 border-2 border-customComplementary w-full bg-customSections text-customText">
              <EditVendorInfo profileId={profile._id} />
            </div>
            <div className="my-4 p-4 border-2 border-customComplementary w-full bg-customSections text-customText">
              <ServiceForm profileId={profile._id} />
            </div>
          </div>
        </>
      )}
      {profile.usertype === 'Customer' && (
        <>
          <div className="my-4 p-4 border-2 border-customComplementary w-full bg-customSections ">
            <CustomerInfo profileId={profile._id} />
          </div>
          <div className="my-4 p-4 border-2 border-customComplementary w-full bg-customSections ">
            <EditCustomerInfo profileId={profile._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

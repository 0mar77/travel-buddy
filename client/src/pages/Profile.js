import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import VendorInfo from "../components/VendorInfo";
import EditVendorInfo from "../components/EditVendorInfo";
import ServiceForm from "../components/ServiceForm";
import CustomerInfo from "../components/CustomerInfo";
import EditCustomerInfo from "../components/EditCustomerInfo";

import { GET_USER_BY_ID } from "../utils/queries";

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
    <div>
      <h2 className="card-header">{profile.username}'s information</h2>

      {/* {profile.skills?.length > 0 && <SkillsList skills={profile.skills} />} */}
      {profile.usertype === "Vendor" && (
        <>
          <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <VendorInfo profileId={profile._id} />
          </div>
          <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <EditVendorInfo profileId={profile._id} />
          </div>
          <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <ServiceForm profileId={profile._id} />
          </div>
        </>
      )}
      {profile.usertype === "Customer" && (
        <>
          <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <CustomerInfo profileId={profile._id} />
          </div>
          <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <EditCustomerInfo profileId={profile._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { ADD_CUSTOMER_INFO } from "../utils/mutations";

const EditCustomerInfo = ({ profileId }) => {
  const [info, setInfo] = useState({
    location: "",
  });

  const [updateInfo, { error }] = useMutation(ADD_CUSTOMER_INFO);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const data = await updateInfo({
        variables: info,
      });

      setInfo({
        location: "",
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>Edit your info</h4>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            onChange={handleInputChange}
            value={info.location}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Update your info
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditCustomerInfo;

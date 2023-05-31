import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

import { ADD_VENDOR_INFO } from '../utils/mutations';

const EditVendorInfo = ({ profileId }) => {
  const [info, setInfo] = useState({
    location: '',
    description: '',
  });

  const [updateInfo, { error }] = useMutation(ADD_VENDOR_INFO);

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
        location: '',
        description: '',
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-customSections p-2 ">
      <h4 className="text-customPrimary">Edit your info</h4>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            onChange={handleInputChange}
            value={info.description}
          ></textarea>
        </div>
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
          <button
            className="btn btn-info btn-block py-3 bg-customComplementary border-2 border-customBody"
            type="submit"
          >
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

export default EditVendorInfo;

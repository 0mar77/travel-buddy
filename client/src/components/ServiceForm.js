import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { CREATE_SERVICE } from "../utils/mutations";

const ServiceForm = ({ profileId }) => {
  const [service, setService] = useState({
    vendorId: profileId,
    name: "",
    description: "",
    price: 0,
    duration: 0,
    category: "",
  });

  const [addService, { error }] = useMutation(CREATE_SERVICE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setService((prevService) => ({
      ...prevService,
      [name]:
        name === "price"
          ? parseFloat(value)
          : name === "duration"
          ? parseInt(value)
          : value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(typeof service.price + service.price);
    console.log(service);

    try {
      const data = await addService({
        variables: service,
      });

      setService({
        vendorId: profileId,
        name: "",
        description: "",
        price: 0,
        duration: 0,
        category: "",
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>Endorse your service below.</h4>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Name of the service</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInputChange}
            value={service.name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description of the service</label>
          <textarea
            type="text"
            className="form-control"
            rows="3"
            name="description"
            onChange={handleInputChange}
            value={service.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price of the service</label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={handleInputChange}
            value={service.price}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration of the service</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            onChange={handleInputChange}
            value={service.duration}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category of the service</label>
          <input
            type="text"
            className="form-control"
            name="category"
            onChange={handleInputChange}
            value={service.category}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Endorse your service
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

export default ServiceForm;

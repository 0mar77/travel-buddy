import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE } from "../utils/mutations";

import Auth from "../utils/auth";

const AddVendorService = () => {
  const [service] = useMutation(CREATE_SERVICE);
  const [serviceData, setService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setService({ ...serviceData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }
      const { data } = await service({ variables: serviceData });

      console.log(data);

      if (!data) {
        throw new Error("Something went wrong!");
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Your information</h1>
          <Form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Name of the service</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleInputChange}
                value={serviceData.name}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description of the service</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                onChange={handleInputChange}
                value={serviceData.description}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Price of the service</label>
              <input
                type="text"
                className="form-control"
                name="price"
                onChange={handleInputChange}
                value={serviceData.price}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration of the service</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                onChange={handleInputChange}
                value={serviceData.duration}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category of the service</label>
              <input
                type="text"
                className="form-control"
                name="category"
                onChange={handleInputChange}
                value={serviceData.category}
              />
            </div>

            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default AddVendorService;

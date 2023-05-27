import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        className="max-w-md mx-auto"
      >
        {showAlert && (
          <div className="mb-3">
            <div className="bg-red-500 text-white px-4 py-2 rounded">
              Something went wrong with your signup!
            </div>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-red-500 mt-1">
            {validated && !userFormData.username && 'Username is required!'}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-red-500 mt-1">
            {validated && !userFormData.email && 'Email is required!'}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <div className="text-red-500 mt-1">
            {validated && !userFormData.password && 'Password is required!'}
          </div>
        </div>

        <button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

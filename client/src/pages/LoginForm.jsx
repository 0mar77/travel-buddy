import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
      console.log(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ email: '', password: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="max-w-md mx-auto"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        {showAlert && (
          <div className="mb-3">
            <div className="bg-red-500 text-white px-4 py-2 rounded">
              Something went wrong with your log in!
            </div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="text"
            placeholder="Your email"
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
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

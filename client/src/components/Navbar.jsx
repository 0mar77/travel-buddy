import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

export default function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container bg-blue-500">
      <div className="flex justify-between items-center">
        <div className="flex-start">
          <h1 className="text-3xl font-bold m-2">Travel Buddy</h1>
        </div>
        <div className="flex-end">
          <a href="#" className="m-2">
            Login
          </a>
          <a href="#" className="m-2">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

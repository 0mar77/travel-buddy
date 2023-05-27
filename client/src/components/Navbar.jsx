import React from 'react';

export default function Navbar({ currentPage, handlePageChange }) {
  return (
    <div className="container bg-blue-500 m-0 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="flex-start">
          <h1 className="text-3xl font-bold m-2">Travel Buddy</h1>
        </div>
        <div className="flex-end">
          <a
            href="#Home"
            onClick={() => handlePageChange('Home')}
            className={`m-2 rounded-lg px-3 py-2 bg-blue-600 text-white ${
              currentPage === 'Home'
                ? 'bg-blue-700'
                : 'hover:bg-blue-700 focus:bg-blue-800'
            }`}
          >
            Home
          </a>
          <a
            href="#Login"
            onClick={() => handlePageChange('Login')}
            className={`m-2 rounded-lg px-3 py-2 bg-blue-600 text-white ${
              currentPage === 'Login'
                ? 'bg-blue-700'
                : 'hover:bg-blue-700 focus:bg-blue-800'
            }`}
          >
            Login
          </a>
          <a
            href="#SignUp"
            onClick={() => handlePageChange('SignUp')}
            className={`m-2 rounded-lg px-3 py-2 bg-blue-600 text-white ${
              currentPage === 'SignUp'
                ? 'bg-blue-700'
                : 'hover:bg-blue-700 focus:bg-blue-800'
            }`}
          >
            Sign Up
          </a>
          <a
            href="#Profile"
            onClick={() => handlePageChange('Profile')}
            className={`m-2 rounded-lg px-3 py-2 bg-blue-600 text-white ${
              currentPage === 'Profile'
                ? 'bg-blue-700'
                : 'hover:bg-blue-700 focus:bg-blue-800'
            }`}
          >
            My Profile
          </a>
        </div>
      </div>
    </div>
  );
}

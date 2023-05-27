import React from 'react';
import icon from '../profileIcons/logo192.png';

export default function ProfilePage() {
  return (
    <div className="container bg-gray-200 ">
      <div className="flex justify-between items-center">
        <div className="flex-start">
          <h1 className="text-3xl font-bold m-2">My Profile</h1>
        </div>
      </div>

      <div className="p-8">
        <div>
          <img
            className=" w-20 h-20 rounded-full bg-gray-500"
            src={icon}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col align-center">
          <h3 className="text-xl font-bold mb-4">Timeline</h3>
          {/* Timeline posts */}
          <div className="post border border-gray-300 rounded p-4 m-2 bg-blue-100">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <img className="mt-4" src={icon} alt="" />
          </div>
          {/* Additional timeline posts */}
          <div className="post border border-gray-300 rounded p-4 m-2 bg-blue-100">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <img className="mt-4" src={icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

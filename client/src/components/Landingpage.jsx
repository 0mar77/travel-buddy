import React from 'react';

export default function Landingpage() {
  return (
    <div className="container bg-gray-200 flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold m-4">Get Started!</h1>
      <form className="w-1/2">
        <div className="mb-4">
          <label
            htmlFor="dropdown"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Search for a city
          </label>
          <select
            id="dropdown"
            name="dropdown"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {/* Replace the options below with the items from your MongoDB database */}
            <option value="">City 1</option>
            <option value="">City 2</option>
            <option value="">City 3</option>
          </select>
        </div>
        {/* Other form fields and submit button */}
      </form>
    </div>
  );
}

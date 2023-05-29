import React from 'react';

export default function Landingpage({ currenCity, handleCityChange }) {
  return (
    <div className="container flex flex-col align-middle bg-gray-200 h-full">
      <div className="container max-w-full m-2 p-2 text-center">
        <h1 className="text-3xl font-bold m-4 max-w-full">Get Started!</h1>
      </div>
      <div className="container flex justify-center max-w-full m-2 p-2">
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
              // value={selectedCity}
              // onChange={handlePageChange('')}
            >
              <option value="">Select a city</option>
              <option className={currenCity === 'City 1'}>City 1</option>
              <option className={currenCity === 'City 1'}>City 2</option>
              <option className={currenCity === 'City 1'}>City 3</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleCityChange({ currenCity })}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

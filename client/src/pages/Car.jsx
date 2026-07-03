import React, { useState } from "react";
import Title from "../component/Title";
import CarCard from "../component/CarCard";
import { assets, dummyCarData } from "../assets/assets";

const Car = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center flex-col py-20 bg-light max-md:p-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        {/* Search Box */}
        <div className="flex items-center bg-white px-4 mt-6 max-w-[560px] w-full h-12 rounded-full shadow">
          <img
            src={assets.search_icon}
            alt="Search"
            className="h-4.5 w-4.5 mr-2"
          />

          <input
            type="text"
            placeholder="Search by make, model, or features"
            className="h-full w-full outline-none text-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <img
            src={assets.filter_icon}
            alt="Filter"
            className="h-4.5 w-4.5 ml-2"
          />
        </div>
      </div>

      {/* Car List */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl max-auto">
          Showing {dummyCarData.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyCarData.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Car;
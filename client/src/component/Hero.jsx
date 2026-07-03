import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-5">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="text-primary font-semibold tracking-widest uppercase">
          Premium Car Rental
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mt-4 text-gray-900 leading-tight">
          Luxury Cars
          <br />
          For Every Journey
        </h1>

        <p className="mt-5 text-gray-500 text-lg max-w-xl mx-auto">
          Book premium cars at affordable prices with instant confirmation and
          24/7 customer support.
        </p>
      </div>

      {/* Search Box */}

      <form className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Pickup */}

          <div>
            <label className="text-sm font-semibold text-gray-800">
              Pickup Location
            </label>

            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              required
            >
              <option value="">Select Location</option>

              {cityList.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>

            <p className="text-gray-400 text-sm mt-2">
              Choose your pickup city
            </p>
          </div>

          {/* Pickup Date */}

          <div>
            <label className="text-sm font-semibold text-gray-800">
              Pickup Date
            </label>

            <input
              type="date"
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Return Date */}

          <div>
            <label className="text-sm font-semibold text-gray-800">
              Return Date
            </label>

            <input
              type="date"
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {/* Search */}

          <div className="py-5">
            <button className=" bg-primary hover:bg-primary-dull text-white rounded-full px-9 py-3 
            font-semibold flex justify-center items-center gap-3 
            transition duration-300 shadow-lg hover:shadow-xl">
              <img
                src={assets.search_icon}
                alt=""
                className="w-5 brightness-0 invert"
              />
              Search Cars
            </button>
          </div>

        </div>

      </form>

     

      <img
        src={assets.main_car}
        alt=""
        className="mt-16 w-full max-w-4xl drop-shadow-2xl hover:scale-105 transition duration-500"
      />
    </div>
  );
};

export default Hero;
import React, { useEffect, useState } from "react";
import Title from "../component/Title.jsx";
import CarCard from "../component/CarCard.jsx";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Car = () => {
  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [filteredCar, setFilteredCar] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const searchAvailability = async () => {
    try {
      const { data } = await axios.post("/api/booking/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCar(data.availableCars);
        if (data.availableCars.length === 0) {
          toast("No cars available for selected dates.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchAvailability();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  const carsToDisplay = isSearchData ? filteredCar : cars;

  const filteredCars = carsToDisplay.filter((car) => {
    const search = input.toLowerCase();
    return (
      car.brand.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search) ||
      car.category.toLowerCase().includes(search) ||
      car.location.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center flex-col py-20 bg-light max-md:p-4"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        {/* Search Bar with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center bg-white px-5 mt-8 max-w-[560px] w-full h-14 rounded-full shadow-md border border-gray-100"
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="h-5 w-5 mr-3"
          />

          <input
            type="text"
            placeholder="Search by brand, model, category or location"
            className="h-full w-full outline-none text-gray-600 placeholder-gray-400 bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <img
            src={assets.filter_icon}
            alt="Filter"
            className="h-5 w-5 ml-3"
          />
        </motion.div>
      </motion.div>

      {/* Cars Listing Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 xl:px-20 max-w-7xl mx-auto mb-6"
        >
          Showing {filteredCars.length} Car{filteredCars.length !== 1 && "s"}
        </motion.p>

        {/* Cars Grid with Stagger Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <motion.div
                key={car._id}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }
                }}
                whileHover={{ 
                  scale: 1.04,
                  transition: { duration: 0.3 }
                }}
              >
                <CarCard car={car} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-gray-500 text-xl"
            >
              No cars found.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Car;
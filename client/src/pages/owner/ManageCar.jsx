import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../component/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageCar = () => {
  const { axios, isOwner, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars || []);
      } else {
        toast.error(data.message);
        setCars([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
      setCars([]);
    }
  };

  const toogleCarAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toogle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        await fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const DeleteCar = async (carId) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this car?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        await fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subtitle="View all listed cars, update availability and remove them from the platform."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm mt-8"
      >
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b sticky top-0 z-10">
            <tr>
              <th className="p-5 font-semibold">Car</th>
              <th className="p-5 font-semibold hidden md:table-cell">Category</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold hidden md:table-cell">Status</th>
              <th className="p-5 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <motion.tr
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  className="border-b last:border-none group"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        src={car.image}
                        alt={car.brand}
                        className="h-16 w-16 rounded-xl object-cover shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          {car.brand} {car.model}
                        </p>
                        <p className="text-sm text-gray-500">
                          {car.seating_capacity} Seats • {car.transmission}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 hidden md:table-cell text-gray-600 font-medium">
                    {car.category}
                  </td>

                  <td className="p-5 font-semibold text-gray-800">
                    {currency}{car.pricePerDay}/day
                  </td>

                  <td className="p-5 hidden md:table-cell">
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        car.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <motion.img
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toogleCarAvailability(car._id)}
                        src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                        alt="Toggle"
                        className="w-6 cursor-pointer hover:scale-125 transition-transform"
                      />

                      <motion.img
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => DeleteCar(car._id)}
                        src={assets.delete_icon}
                        alt="Delete"
                        className="w-6 cursor-pointer hover:scale-125 transition-transform"
                      />
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ManageCar;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loader from '../component/Loader';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CarDetails = () => {
  const { id } = useParams();
  const { cars, pickupDate, setPickupDate, returnDate, setReturnDate, currency } = useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/booking/create',{
        car:id, pickupDate, returnDate
      });
      if(data.success){
        toast.success(data.message);
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((c) => c._id === id));
  }, [cars, id]);

  if (!car) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Back Button */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:-translate-x-1 transition-transform">
            <img src={assets.arrow_icon} alt="Back" className="h-4 rotate-180" />
          </div>
          <span className="font-medium">Back to all cars</span>
        </motion.button>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Car Info */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-auto max-h-[520px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-6 bg-white px-5 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available Now
              </motion.div>
            </motion.div>

            {/* Title & Price */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-xl text-gray-500 mt-1">
                    {car.category} • {car.year}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 text-3xl font-bold text-primary">
                  {currency}{car.pricePerDay}
                  <span className="text-base font-normal text-gray-400">/day</span>
                </div>
              </div>
            </motion.div>

            {/* Specs Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                { icon: assets.users_icon, label: 'Seats', value: `${car.seating_capacity}` },
                { icon: assets.car_icon, label: 'Fuel', value: car.fuel_type },
                { icon: assets.fuel_icon, label: 'Transmission', value: car.transmission },
                { icon: assets.location_icon, label: 'Location', value: car.location },
              ].map(({ icon, label, value }, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
                    <img src={icon} alt={label} className="h-7 w-7" />
                  </div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-semibold text-xl text-gray-900 mt-1">{value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {car.description || "Experience premium comfort and performance with this exceptional vehicle. Perfect for both city drives and long journeys."}
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "360° Camera", "Bluetooth Connectivity", "GPS Navigation", 
                  "Heated Seats", "Rear View Camera", "Cruise Control", 
                  "Keyless Entry", "Apple CarPlay"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-primary/5 transition-all p-4 rounded-2xl group"
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform">
                      <img src={assets.check_icon} alt="✓" className="h-4" />
                    </div>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Card */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {currency}{car.pricePerDay}
                  <span className="text-xl font-normal text-gray-400"> / day</span>
                </div>
                <p className="text-primary text-sm font-medium">Free cancellation • No hidden fees</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 focus:border-primary focus:ring-primary rounded-2xl px-5 py-4 text-lg transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 focus:border-primary focus:ring-primary rounded-2xl px-5 py-4 text-lg transition-all"
                    required
                  />
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily rate</span>
                    <span className="font-medium">{currency}{car.pricePerDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total days</span>
                    <span className="font-medium">—</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{currency}—</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dull text-white font-semibold py-5 rounded-2xl text-xl shadow-lg shadow-primary/30 transition-all"
                >
                  Reserve This Car
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  No credit card required to reserve
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
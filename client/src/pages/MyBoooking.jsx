import React, { useEffect, useState } from 'react';
import { assets, dummyMyBookingsData } from '../assets/assets';
import Title from '../component/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const MyBoooking = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { axios, user, currency } = useAppContext();

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/booking/user');
      
      if (data.success) {
        setBooking(data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookingData();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Enhanced Loader
  const Loader = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 mt-4">Loading your bookings...</p>
    </motion.div>
  );

  return (
    <div className='px-6 lg:px-24 md:px-16 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title 
        title='My Booking'
        subTitle='View and manage your all car bookings' 
        align="left"
      />

      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {booking.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">You don't have any bookings yet.</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {booking.map((bookingItem, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" 
                  }}
                  className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-2xl mt-5 first:mt-0 bg-white hover:border-primary/30 transition-colors'
                >
                  {/* Car Image + Info */}
                  <div className='md:col-span-1'>
                    <div className='rounded-xl overflow-hidden mb-4 shadow-sm'>
                      <img 
                        src={bookingItem.car.image} 
                        alt="" 
                        className='w-full h-auto aspect-video object-cover'
                      />
                    </div>
                    <p className='text-lg font-semibold mt-2'>
                      {bookingItem.car.brand} {bookingItem.car.model}
                    </p>
                    <p className='text-gray-500'>
                      {bookingItem.car.year}, {bookingItem.car.category}, {bookingItem.car.location}
                    </p>
                  </div>

                  {/* Booking Info */}
                  <div className='md:col-span-2'>
                    <div className='flex items-center gap-2'>
                      <p className='px-4 py-1.5 bg-light rounded-full text-sm font-medium'>
                        Booking #{index + 1}
                      </p>
                      <p className={`px-4 py-1 text-xs rounded-full font-medium ${
                        bookingItem.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {bookingItem.status}
                      </p>
                    </div>

                    <div className='flex items-start gap-3 mt-5'>
                      <img src={assets.calendar_icon_colored} alt="" className='w-5 h-5 mt-1'/>
                      <div>
                        <p className='text-gray-500 text-sm'>Rental Period</p>
                        <p className='font-medium'>
                          {bookingItem.pickupDate.split('T')[0]} — {bookingItem.returnDate.split('T')[0]}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 mt-4'>
                      <img src={assets.location_icon_colored} alt="" className='w-5 h-5 mt-1'/>
                      <div>
                        <p className='text-gray-500 text-sm'>Pick-up Location</p>
                        <p className='font-medium'>{bookingItem.car.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className='md:col-span-1 flex justify-between flex-col'>
                    <div className='text-right'>
                      <p className='text-sm text-gray-500'>Total Price</p>
                      <h1 className='text-3xl font-bold text-primary mt-1'>
                        {currency}{bookingItem.price}
                      </h1>
                      <p className='text-xs text-gray-500 mt-2'>
                        Booked on {bookingItem.createdAt.split('T')[0]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MyBoooking;
import React from 'react';
import Title from './Title.jsx';
import { assets } from '../assets/assets';
import CarCard from './carCard.jsx';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center py-12 md:px-16 lg:px-24 xl:px-32 bg-white"
    >
      {/* Title Animation */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Title 
          title="Featured Vehicles" 
          subTitle="Explore our selection of premium vehicles available for the next adventure." 
        />
      </motion.div>

      {/* Cars Grid with Stagger Animation */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 }
          }
        }}
      >
        {cars.slice(0, 6).map((car, index) => (
          <motion.div
            key={car._id}
            variants={{
              hidden: { opacity: 0, y: 80, scale: 0.92 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
            whileHover={{ 
              scale: 1.06, 
              transition: { duration: 0.4 } 
            }}
            whileTap={{ scale: 0.97 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Explore Button */}
      <motion.button
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        onClick={() => {
          navigate('/cars');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mt-16 flex items-center gap-3 px-10 py-4 border border-borderColor rounded-2xl text-lg font-medium hover:bg-gray-50 transition-colors"
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5" />
      </motion.button>
    </motion.section>
  );
};

export default FeaturedSection;
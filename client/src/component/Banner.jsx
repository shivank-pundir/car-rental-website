import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-start items-center justify-between 
                 px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0058FE] to-[#A9CFFF] 
                 max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden mt-10 mb-10"
    >
      {/* Left Side - Text Content */}
      <motion.div
        className="text-white max-w-lg"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-medium leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Do You Own a Luxury Car?
        </motion.h2>

        <motion.p 
          className="mt-4 text-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Monetize your Vehicle effortlessly by listing on carRantel.
        </motion.p>

        <motion.p 
          className="mt-3 text-base opacity-90"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          We take care of insurance, driver verification and secure payments — 
          so you can earn passive income, stress-free.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.6 }}
          className="px-8 py-3 bg-white hover:bg-slate-100 text-primary rounded-xl 
                     text-base font-medium mt-6 cursor-pointer transition-all"
        >
          List Your Car
        </motion.button>
      </motion.div>

      {/* Right Side - Car Image */}
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-10 md:mt-0"
      >
        <img 
          src={assets.banner_car_image} 
          alt="car" 
          className="max-h-[280px] md:max-h-[320px] drop-shadow-2xl" 
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
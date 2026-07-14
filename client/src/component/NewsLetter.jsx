import React from 'react';
import { motion } from 'framer-motion';

const NewsLetter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="md:text-5xl text-3xl font-semibold text-gray-900"
      >
        Never Miss a Deal!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="md:text-lg text-gray-500/70 max-w-xl pb-8"
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </motion.p>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 rounded-2xl overflow-hidden shadow-lg"
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          className="border border-gray-300 h-full border-r-0 outline-none w-full rounded-r-none px-6 text-gray-600 placeholder-gray-400 text-base"
          type="email"
          placeholder="Enter your email address"
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="md:px-14 px-10 h-full text-white bg-primary hover:bg-blue-700 
                     font-medium text-base cursor-pointer transition-all flex items-center justify-center"
        >
          Subscribe
        </motion.button>
      </motion.form>

      {/* Trust Line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-gray-400 mt-4 tracking-wider"
      >
        ✨ Your email is safe with us. Unsubscribe anytime.
      </motion.p>
    </motion.div>
  );
};

export default NewsLetter; 
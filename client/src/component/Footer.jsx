import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-20 border-t border-gray-100">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={assets.logo} alt="CarRental Logo" className="w-40" />

            <p className="mt-6 text-gray-600 leading-relaxed text-[15px]">
              Discover premium cars at affordable prices. Whether you're planning
              a business trip, family vacation, or weekend getaway, we've got the
              perfect ride for every journey.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {["𝕏", "", ""].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white text-xl transition-all duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3 text-gray-600">
              {["About Us", "Our Cars", "Pricing", "Careers"].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 8 }}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-3 text-gray-600">
              {["Blog", "Help Center", "FAQs", "Contact Support"].map((item, i) => (
                <motion.li key={i} whileHover={{ x: 8 }}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-5">
              Subscribe for exclusive offers, new arrivals, and special discounts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white border border-gray-300 focus:border-primary rounded-xl px-5 py-3 outline-none flex-1"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl whitespace-nowrap transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-100 py-6 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} <span className="text-gray-900 font-medium">CarRental</span>. 
            All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms & Conditions", "Cookies"].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ color: "#000" }}
                className="hover:text-gray-900 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
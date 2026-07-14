import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Testinomial = () => {
    const testimonials = [
        {  
            name: "Emma Rodriguez", 
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1,
            testimonial: "I've rented car from variours companies, but the experience with the carRental was exceptional"
        },
        {
            name: "James Carter",
            location: "Toronto, Canada",
            image: assets.testimonial_image_2,
            testimonial: "The booking process was quick and hassle-free. The car was spotless, well-maintained, and exactly as described. I'll definitely use CarRental again."
        },
        {
            name: "Sophia Müller",
            location: "Berlin, Germany",
            image: assets.testimonial_image_1,
            testimonial: "Excellent customer service and competitive prices. Picking up and returning the car was seamless, making my business trip completely stress-free."
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-gray-50"
        >
            {/* Title Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Title 
                    title="What Our Customers Say" 
                    subTitle="Discover why discerning travelers choose CarRental for their luxury journeys around the world." 
                />
            </motion.div>

            {/* Testimonials Grid with Stagger Animation */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.15 }
                    }
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 80, scale: 0.9 },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                transition: { duration: 0.6, ease: "easeOut" }
                            }
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            y: -10,
                            transition: { duration: 0.4 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <img 
                                className="w-14 h-14 rounded-full object-cover" 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                            />
                            <div>
                                <p className="text-xl font-semibold">{testimonial.name}</p>
                                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-6">
                            {Array(5).fill(0).map((_, i) => (
                                <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-600 mt-6 leading-relaxed font-light">
                            "{testimonial.testimonial}"
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Testinomial;
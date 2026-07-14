import React, { useState } from 'react';
import Title from '../../component/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AddCard = () => {
  const { axios, currency } = useAppContext();
  
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: ''
  });

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('carData', JSON.stringify(car));

      const { data } = await axios.post('/api/owner/add-car', formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setImage(null);
        setCar({
          brand: '', model: '', year: '', pricePerDay: '', category: '',
          transmission: '', fuel_type: '', seating_capacity: '',
          location: '', description: ''
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title 
          title="Add New Car" 
          subtitle="Fill the details to list your car for booking. Provide accurate information for better visibility." 
        />
      </motion.div>

      <motion.form
        onSubmit={onSubmitHandeler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-10 max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10 space-y-10"
      >
        {/* Image Upload */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-gray-100">
          <label htmlFor="car-image" className="cursor-pointer group">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="h-32 w-32 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-primary transition-all duration-300"
            >
              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Car" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className="text-center">
                  <img src={assets.upload_icon} alt="Upload" className="h-10 mx-auto opacity-70" />
                  <p className="text-xs text-gray-500 mt-2">Upload Image</p>
                </div>
              )}
            </motion.div>
            <input 
              type="file" 
              id="car-image" 
              accept="image/*" 
              hidden 
              onChange={e => setImage(e.target.files[0])} 
            />
          </label>

          <div>
            <p className="text-lg font-semibold text-gray-800">Car Photo</p>
            <p className="text-sm text-gray-500 mt-1">Upload a high-quality photo of your car (exterior recommended)</p>
          </div>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Toyota"
              required
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, C-Class, Camry"
              required
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Year</label>
            <input type="number" placeholder="2025" required value={car.year} onChange={(e) => setCar({...car, year: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Daily Price ({currency})</label>
            <input type="number" placeholder="120" required value={car.pricePerDay} onChange={(e) => setCar({...car, pricePerDay: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Category</label>
            <select value={car.category} onChange={(e) => setCar({...car, category: e.target.value})} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Transmission</label>
            <select value={car.transmission} onChange={(e) => setCar({...car, transmission: e.target.value})} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Fuel Type</label>
            <select value={car.fuel_type} onChange={(e) => setCar({...car, fuel_type: e.target.value})} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Seating Capacity</label>
            <input type="number" placeholder="5" required value={car.seating_capacity} onChange={(e) => setCar({...car, seating_capacity: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Location</label>
          <select value={car.location} onChange={(e) => setCar({...car, location: e.target.value})} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Miami">Miami</option>
            <option value="San Francisco">San Francisco</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            rows={6}
            placeholder="Describe your car: features, condition, mileage, etc."
            required
            value={car.description}
            onChange={(e) => setCar({...car, description: e.target.value})}
            className="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-y transition-all"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-3 px-10 py-4 bg-primary hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30 transition-all disabled:opacity-70 w-full md:w-auto"
        >
          <img src={assets.tick_icon} alt="" className="h-5" />
          {isLoading ? 'Listing Your Car...' : 'List This Car'}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddCard;
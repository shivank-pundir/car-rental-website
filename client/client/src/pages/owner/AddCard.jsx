import React, { useState } from 'react'
import Title from '../../component/owner/Title';
import { assets } from '../../assets/assets';

const AddCard = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const onSubmitHandeler = async(e) => {
      e.preventDefault();
  }
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand:'',
    model:'',
    year:'',
    pricePerDay:'',
    category:'',
    transmission:'',
    fuel_type:'',
    seating_capacity:0,
    location:'',
    description:''
  })

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800
    placeholder:text-gray-400 shadow-sm transition-all duration-200 outline-none
    focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-400
  `;
  const labelClass = "mb-2 text-sm font-semibold text-gray-700";

  return (
    <div className='px-4 py-10 md:px-10 flex-1 bg-gray-50/50 min-h-screen'>
      <Title title="Add new car"
      subtitle="Fill the details to list the new car for booking including pricing, availability and car specification"/>

      <form onSubmit={onSubmitHandeler} className='mt-8 max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8'>

        {/* car image */}
        <div className='flex items-center gap-4 w-full pb-6 border-b border-gray-100'>
          <label htmlFor="car-image" className='cursor-pointer group'>
            <div className='h-24 w-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-primary transition-colors duration-200'>
              <img src={image ? URL.createObjectURL(image): assets.upload_icon} alt=""
              className={image ? 'h-full w-full object-cover' : 'h-8 opacity-60'}/>
            </div>
            <input type="file" id='car-image' accept='image/*' hidden
            onChange={e=>setImage(e.target.files[0])}/>
          </label>
          <div>
            <p className='text-sm font-semibold text-gray-700'>Car image</p>
            <p className='text-sm text-gray-500'>Upload a clear photo of your car</p>
          </div>
        </div>

        {/* car brand and model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand */}
          <div className="flex flex-col">
            <label htmlFor="brand" className={labelClass}>Brand</label>
            <input
              id="brand"
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Model */}
          <div className="flex flex-col">
            <label htmlFor="model" className={labelClass}>Model</label>
            <input
              id="model"
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* car year, price and category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className="flex flex-col">
            <label htmlFor="year" className={labelClass}>Year</label>
            <input
              id="year"
              type="number" placeholder="2025"
              required value={car.year} onChange={(e) => setCar({...car, year: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pricePerDay" className={labelClass}>Daily Price ({currency})</label>
            <input
              id="pricePerDay"
              type="number" placeholder="100"
              required value={car.pricePerDay} onChange={(e) => setCar({...car, pricePerDay: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" onChange={e=> setCar({...car,category:e.target.value})} value={car.category}
              className={inputClass}>
              <option value="">Select the Category</option>
              <option value="Sedan">Sedan</option>
              <option value="Suv">Suv</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* car transmission, fuel type, seating capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="transmission" className={labelClass}>Transmission</label>
            <select id="transmission" onChange={e=> setCar({...car,transmission:e.target.value})} value={car.transmission}
              className={inputClass}>
              <option value="">Select a transition</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="fuel_type" className={labelClass}>Fuel Type</label>
            <select id="fuel_type" onChange={e=> setCar({...car,fuel_type:e.target.value})} value={car.fuel_type}
              className={inputClass}>
              <option value="">Select a fuel_type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="seating_capacity" className={labelClass}>Seating Capacity</label>
            <input
              id="seating_capacity"
              type="number" placeholder="4"
              required value={car.seating_capacity} onChange={(e) => setCar({...car, seating_capacity: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* car location */}
        <div className='flex flex-col w-full'>
          <label htmlFor="location" className={labelClass}>Location</label>
          <select id="location" onChange={e=> setCar({...car,location:e.target.value})} value={car.location}
            className={inputClass}>
            <option value="">Select a location</option>
            <option value="ew York">New York</option>
            <option value="Los Angles">Los Angles</option>
            <option value="Huston">Huston</option>
            <option value="chicago">chicago</option>
          </select>
        </div>

        {/* car description */}
        <div className='flex flex-col w-full'>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea
            id="description"
            rows={5}
            placeholder='A luxurios SUV with the spacious interior and a powerful engine.'
            required
            value={car.description}
            onChange={e=> setCar({...car, description:e.target.value})}
            className={inputClass}
          ></textarea>
        </div>

        <button className='flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium
        w-max cursor-pointer shadow-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200'>
          <img src={assets.tick_icon} alt="" />
          List your car
        </button>
      </form>
    </div>
  )
}

export default AddCard

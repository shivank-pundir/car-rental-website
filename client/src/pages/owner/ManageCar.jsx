import React, { useEffect, useState } from 'react'
import { dummyCarData } from '../../assets/assets'

const ManageCar = () => {
  const [cars,setCars] = useState([])

  const fetchOwnerCars = async()=> {
      setCars(dummyCarData);
  }

  useEffect(() =>{
    fetchOwnerCars()
  },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
            
    </div>
  )
}

export default ManageCar

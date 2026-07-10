import React from 'react'
import { Link } from 'react-router-dom'
import { assets, dummyUserData } from '../../assets/assets'

const OwnerNavbar = () => {
  const user = dummyUserData
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-400 border border-borderColor
    relative trasition-all'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='h-7'/>  
          </Link>
          <p className=''>Welcome, {user.name || 'owner'}</p>
    </div>
  )
}

export default OwnerNavbar

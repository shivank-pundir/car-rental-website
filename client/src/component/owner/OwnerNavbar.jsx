import React from 'react'
import { Link } from 'react-router-dom'
import { assets} from '../../assets/assets'
import { useAppContext } from '../../context/AppContext.jsx'

const OwnerNavbar = () => {
  const {user} = useAppContext();
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-primary border border-borderColor
    relative trasition-all text-2xl'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='h-7'/>  
          </Link>
          <p >Welcome, {user?.name || 'owner'}</p>
    </div>
  )
}

export default OwnerNavbar

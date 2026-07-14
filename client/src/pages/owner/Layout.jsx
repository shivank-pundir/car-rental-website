import React, { useEffect } from 'react'
import OwnerNavbar from '../../component/owner/OwnerNavbar'
import SideBar from '../../component/owner/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext();

  useEffect(()=> {
    if(!isOwner){
      navigate('/');
    }
  },[isOwner])
   
  return (
    <div className='flex flex-col'>
      <OwnerNavbar />
      <div className='flex'>
          <SideBar />
          <Outlet />
      </div>
    </div>
  )
}

export default Layout

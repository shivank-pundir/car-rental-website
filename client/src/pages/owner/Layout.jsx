import React, { useEffect } from 'react'
import OwnerNavbar from '../../component/owner/OwnerNavbar.jsx'
import SideBar from '../../component/owner/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'

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

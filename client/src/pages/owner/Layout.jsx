import React from 'react'
import OwnerNavbar from '../../component/owner/OwnerNavbar'
import SideBar from '../../component/owner/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
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

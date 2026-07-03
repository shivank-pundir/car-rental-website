import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import Car from "./pages/Car";
import MyBooking from "./pages/MyBoooking";
import CarDetails from "./pages/CarDetails";

import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import ManageCar from "./pages/owner/ManageCar";
import AddCard from "./pages/owner/AddCard";
import ManageBooking from "./pages/owner/MannageBooking";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <>
      {/* Navbar */}
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      {/* Routes */}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBooking />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCard />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Routes>

      {/* Footer */}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
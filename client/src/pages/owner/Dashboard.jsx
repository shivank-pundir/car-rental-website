import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../component/owner/Title.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { axios, currency, isOwner } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBooking: 0,
    pendingBookings: 0,
    compeleteBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const DashboardCard = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBooking,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.compeleteBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");

      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashBoardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1 bg-gray-50 min-h-screen">
      <Title
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities."
      />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {DashboardCard.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {card.title}
                </p>
                <h2 className="text-4xl font-bold text-gray-800 mt-3">
                  {card.value}
                </h2>
              </div>

              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-8 h-8"
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">

        {/* Recent Bookings */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="p-6 md:p-8 border border-gray-100 bg-white rounded-3xl shadow-sm flex-1 max-w-lg w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Recent Bookings
              </h1>
              <p className="text-gray-500 mt-1">
                Latest customer activity
              </p>
            </div>

            <div className="text-xs px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
              LIVE
            </div>
          </div>

          {data.recentBookings.length > 0 ? (
            data.recentBookings.map((booking, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ backgroundColor: "#f8fafc" }}
                className="mt-5 flex items-center justify-between py-4 border-t border-gray-100 first:border-t-0 hover:bg-gray-50 rounded-xl px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10">
                    <img
                      src={assets.listIconColored}
                      alt=""
                      className="h-6 w-6"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.car?.brand} {booking.car?.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.createdAt?.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-emerald-600">
                    {currency}
                    {booking.price}
                  </p>

                  <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              No bookings found.
            </div>
          )}
        </motion.div>

        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-8 border border-gray-100 bg-white rounded-3xl shadow-sm flex-1 md:max-w-xs"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Monthly Revenue
              </h1>
              <p className="text-gray-500 mt-1">
                Current month performance
              </p>
            </div>

            <div className="text-emerald-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6"
                />
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-5xl font-bold text-primary">
              {currency}
              {data.monthlyRevenue}
            </h2>
            <p className="text-gray-500 mt-3">
              Total earnings this month
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../assets/assets';
import Title from '../../component/owner/Title';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [data, setData] = useState({
    totalcars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const DashboardCard = [
    {
      title: "Total Cars",
      value: data.totalcars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1 bg-gray-50 min-h-screen">
      <Title
        title="Admin Dashboard"
        subtitle="Monitor overall platform performance including total cars, total revenue, bookings, and recent activities."
      />

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {DashboardCard.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              <h1 className="text-sm font-medium text-gray-500 tracking-wider uppercase">{card.title}</h1>
              <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
            </div>

            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform duration-300">
              <img src={card.icon} alt="" className="h-7 w-7" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">

        {/* Recent Booking */}
        <div className="p-6 md:p-8 border border-gray-100 bg-white rounded-3xl shadow-sm flex-1 max-w-lg w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Recent Bookings</h1>
              <p className="text-gray-500 mt-1">Latest customer activity</p>
            </div>
            <div className="text-xs px-4 py-2 bg-primary/5 text-primary rounded-full font-medium">
              LIVE
            </div>
          </div>

          {data.recentBookings.map((booking, index) => (
            <div
              key={index}
              className="mt-5 flex items-center justify-between py-4 border-t border-gray-100 first:border-t-0 hover:bg-gray-50 rounded-xl px-3 -mx-3 transition-colors"
            >
              <div className="flex items-center gap-4">

                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <img
                    src={assets.listIconColored}
                    alt=""
                    className="h-6 w-6"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt?.split("T")[0]}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-emerald-600">
                  {currency}{booking.price}
                </p>

                <p className="px-4 py-1.5 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Revenue */}
        <div className='p-8 border border-gray-100 bg-white rounded-3xl shadow-sm flex-1 md:max-w-xs'>
          <div className="flex justify-between items-start">
            <div>
              <h1 className='text-2xl font-semibold text-gray-800'>Monthly Revenue</h1>
              <p className='text-gray-500 mt-1'>Current month performance</p>
            </div>
            <div className="text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-9 9-4-4-6 6" />
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <p className='text-5xl font-bold text-primary tracking-tighter'>
              {currency}{data.monthlyRevenue}
            </p>
            <p className="text-emerald-600 text-sm font-medium mt-3 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              +12.4% from last month
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
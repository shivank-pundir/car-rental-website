import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../component/owner/Title";

const ManageBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [booking, setBooking] = useState([]);

  const fetchBookingData = () => {
    setBooking(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Booking"
        subtitle="Track all customer bookings, approve and cancel requests, and manage booking statuses."
      />

      <div className="w-full overflow-x-auto rounded-md border border-borderColor mt-6 bg-white">
        <table className="min-w-full border-collapse text-left text-sm text-gray-600">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Car</th>
              <th className="p-4 font-semibold max-md:hidden">
                Date Range
              </th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold max-md:hidden">
                Payment
              </th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {booking.map((booking, index) => (
              <tr
                key={booking._id || booking.id || index}
                className="border-t border-borderColor hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="h-12 w-12 rounded-md object-cover"
                    />

                    <div className="max-md:hidden">
                      <p className="font-semibold text-gray-800">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 max-md:hidden">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                <td className="p-4 font-medium">
                  {currency}
                  {booking.price}
                </td>

                <td className="p-4 max-md:hidden">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    Offline
                  </span>
                </td>

                <td className="p-4">
                  {booking.status === "pending" ? (
                    <select
                      value={booking.status}
                      onChange={() => {}}
                      className="px-3 py-2 text-sm border border-borderColor rounded-md outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {booking.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
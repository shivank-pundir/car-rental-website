import React, { useEffect, useState } from "react";
import Title from "../../component/owner/Title.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ManageBooking = () => {
  const { axios, currency } = useAppContext();

  const [booking, setBooking] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchBookingData = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner");
      if (data.success) {
        setBooking(data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      setLoadingId(bookingId);
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId,
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBookingData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Bookings"
        subtitle="Track all customer bookings, approve or cancel requests, and manage statuses."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm mt-8"
      >
        <table className="min-w-full border-collapse text-left text-sm text-gray-600">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="p-5 font-semibold">Car</th>
              <th className="p-5 font-semibold max-md:hidden">Date Range</th>
              <th className="p-5 font-semibold">Total</th>
              <th className="p-5 font-semibold max-md:hidden">Payment</th>
              <th className="p-5 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {booking.length > 0 ? (
              booking.map((bookingItem, index) => (
                <motion.tr
                  key={bookingItem._id || index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        src={bookingItem.car.image}
                        alt={`${bookingItem.car.brand} ${bookingItem.car.model}`}
                        className="h-14 w-14 rounded-xl object-cover shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {bookingItem.car.brand} {bookingItem.car.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {bookingItem.car.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 max-md:hidden text-gray-700">
                    {bookingItem.pickupDate.split("T")[0]} →{" "}
                    {bookingItem.returnDate.split("T")[0]}
                  </td>

                  <td className="p-5 font-semibold text-gray-800">
                    {currency}
                    {bookingItem.price}
                  </td>

                  <td className="p-5 max-md:hidden">
                    <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-xs font-medium">
                      Offline
                    </span>
                  </td>

                  <td className="p-5">
                    {bookingItem.status === "pending" ? (
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={bookingItem.status}
                        disabled={loadingId === bookingItem._id}
                        onChange={(e) =>
                          changeBookingStatus(bookingItem._id, e.target.value)
                        }
                        className="px-4 py-2.5 text-sm border border-gray-300 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 transition-all"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                      </motion.select>
                    ) : (
                      <motion.span
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className={`inline-block px-5 py-1.5 rounded-full text-sm font-semibold ${
                          bookingItem.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {bookingItem.status.charAt(0).toUpperCase() + bookingItem.status.slice(1)}
                      </motion.span>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-500">
                  No bookings found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ManageBooking;
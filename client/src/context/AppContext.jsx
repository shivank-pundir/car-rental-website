import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [cars, setCars] = useState([]);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      }
    } catch (error) {
      // Ignore unauthorized error on first load
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  // Fetch all cars
 const fetchCars = async () => {
  try {
    const { data } = await axios.get("/api/user/cars");

    console.log("API Response:", data);

    if (data.success) {
      console.log("Cars:", data.cars);
      console.log("Total:", data.cars.length);

      setCars(data.cars);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};  
  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];

    setToken(null);
    setUser(null);
    setIsOwner(false);

    toast.success("Logged out successfully");
    navigate("/");
  };

  // Load cars when app starts
  useEffect(() => {
    fetchCars();
  }, []);

  // Handle authentication
  useEffect(() => {
    if (token) {
      // ✅ Send token in Bearer format
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      localStorage.setItem("token", token);

      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    navigate,
    currency,

    axios,

    token,
    setToken,

    user,
    setUser,

    isOwner,
    setIsOwner,

    showLogin,
    setShowLogin,

    cars,
    setCars,

    pickupDate,
    setPickupDate,

    returnDate,
    setReturnDate,

    fetchUser,
    fetchCars,

    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
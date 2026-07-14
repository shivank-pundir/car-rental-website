import Booking from "../model/booking.js"
import Car from "../model/car.js";

//function to check car availability of car for given date
export const checkAvailability = async (car, pickupDate, returnDate) => {
    const booking = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
    });

    return booking.length === 0;
};

//function to check car availability of car for given date and location

//API to create booking 
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;

    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(
      car,
      pickupDate,
      returnDate
    );

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available",
      });
    }

    const carData = await Car.findById(car);

console.log("Car Data:", carData);
console.log("Owner:", carData.owner);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    


    const noOfDays = Math.ceil(
      (returned - picked) / (1000 * 60 * 60 * 24)
    );

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({
      success: true,
      message: "Booking created",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API to list user booking
export const checkCarAvailability = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const allCars = await Car.find();

console.log(allCars);

    // Validate request
    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Location, pickup date and return date are required",
      });
    }

    console.log("Search Request:");
    console.log({
      location,
      pickupDate,
      returnDate,
    });

    // Find available cars at the given location (case-insensitive)
    const cars = await Car.find({
      location: {
        $regex: new RegExp(`^${location.trim()}$`, "i"),
      },
      isAvailable: true,
    });
   

console.log("All Cars:");
console.log(cars);

    console.log("Cars found:", cars.length);

    if (cars.length === 0) {
      return res.json({
        success: true,
        availableCars: [],
      });
    }

    const availableCars = [];

    for (const car of cars) {
      const available = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      console.log(
        `${car.brand} ${car.model} -> ${
          available ? "Available" : "Booked"
        }`
      );

      if (available) {
        availableCars.push(car);
      }
    }

    console.log("Available Cars:", availableCars.length);

    return res.json({
      success: true,
      availableCars,
    });
  } catch (error) {
    console.log("checkCarAvailability Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to list bookings of logged in user
export const getUserBooking = async (req, res) => {
  try {
    const { _id } = req.user;

    const booking = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to list bookings of owner
export const getOwnerBooking = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const booking = await Booking.find({
      owner: req.user._id,
    })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check owner
    if (booking.owner.toString() !== _id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Booking status changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
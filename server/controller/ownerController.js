import path from "path";
import imagekit from "../configs/imageKit.js";
import User from "../model/user.js";
import fs from "fs";
import Car from "../model/car.js";
import { error } from "console";
import Booking from "../model/booking.js";

//Api to change role to user
export const changeRoleToOwner = async (req, res) => {
  try {
    console.log("Button clicked");
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: " Now you can list you cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Api  to List car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Delete local file
    fs.unlinkSync(imageFile.path);

    // Optimized ImageKit URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "1280",
          quality: "auto",
          format: "webp",
        },
      ],
    });

    await Car.create({
      ...car,
      owner: _id,
      image: optimizedImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Car Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to list owner car
export const getOwnerCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to toggle car avaliability
export const toggleCarAvalbility = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    //checking car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
  return res.json({
    success: false,
    message: "Unauthorized",
  });
}
    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message:"toggle car Avalibility successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    //checking car belongs to the user
    if (car.owner.toString() != _id.toString()) {
      res.json({ success: false, message: "Unauthorized" });
    }
    car.owner = null;
    car.isAvailable = false;
    await car.save();
    res.json({ success: true, message:"delete car owner successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//API to get Dashboard data
export const getDashboardData = async (req, res) => {
  try {
   const {_id, role} = req.user;

   if(role !== 'owner'){
    console.log(error.message);
    res.json({success:true, message:"Unauthorized"});
   }
   const cars = await Car.find({owner: _id})
   
   const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});

   const pendingBookings = await Booking.find({owner: _id, starus:'pending'})
   const compeleteBookings = await Booking.find({owner: _id, starus:'confirmed'})
     
   //calculate monthlyRevenue from booking where status is confirmed
   const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => 
  acc + booking.price, 0)  
   const dashboardData  = {
    totalCars:cars.length,
    totalBooking :bookings.length,
    pendingBookings : pendingBookings.length,
    compeleteBookings :  compeleteBookings.length,
    recentBookings : bookings.slice(0,3),
    monthlyRevenue
   } 
   
   res.json({success: true, dashboardData})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//api to update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Read uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // Delete local file
    fs.unlinkSync(imageFile.path);

    // Generate optimized ImageKit URL
    const image = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "400",
          quality: "auto",
          format: "webp",
        },
      ],
    });

    // Update user image
    await User.findByIdAndUpdate(_id, { image });

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully.",
      image,
    });
  } catch (error) {
    console.error("Update User Image Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

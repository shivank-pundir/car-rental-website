
import express from 'express'
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCar, toggleCarAvalbility, updateUserImage } from '../controller/ownerController.js';
import upload from '../configs/multer.js';

const ownerRourter = express.Router();

ownerRourter.post('/change-role',protect,changeRoleToOwner);
ownerRourter.post('/add-car',upload.single("image"), protect, addCar);
ownerRourter.post('/toogle-car',protect, toggleCarAvalbility);
ownerRourter.get('/cars',protect,getOwnerCar);
ownerRourter.post('/delete-car',protect,deleteCar);
ownerRourter.get('/dashboard',protect,getDashboardData);
ownerRourter.post('/update-image',upload.single("image"), protect,updateUserImage);





export default ownerRourter;
import express from 'express'
import { getCar, getUseData, loginUser, registerUser } from '../controller/userController.js';
import {protect} from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUseData);
userRouter.get('/cars',getCar);

export default userRouter;  
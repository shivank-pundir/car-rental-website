import express from 'express'
import { changeBookingStatus, checkAvailability, createBooking, getOwnerBooking, getUserBooking } from '../controller/bookingController.js'
import {protect} from '../middleware/auth.js'

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailability); 
bookingRouter.post('/create',protect ,createBooking); 
bookingRouter.get('/user',protect ,getUserBooking);
bookingRouter.get('/owner',protect ,getOwnerBooking);
bookingRouter.post('/chage-status',protect ,changeBookingStatus);

export default bookingRouter;   




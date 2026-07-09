import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/UserRouters.js';
import ownerRourter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRouter.js';


//initilize express app
const app = express();


//connect database
await connectDB()

//Middleware
app.use(cors())
app.use(express.json())

//user Router
app.use('/api/user',userRouter);

//owner Router
app.use('/api/owner',ownerRourter)

//booking Router
app.use("/api/booking",bookingRouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))
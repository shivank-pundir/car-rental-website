import Booking from "../model/booking.js"
import Car from "../model/car.js";

//function to check car availability of car for given date
export const checkAvailability = async(car,pickupDate, returnDate) => {
        const booking = await Booking.find({
            car,
            pickupDate:{$lte: returnDate},
            returnDate:{$gte: pickupDate}
        })
        return booking.length === 0;
}

//function to check car availability of car for given date and location
export const checkCarAvailability = async(req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body;
    
        //fetch all the available car for the give location
        const cars = await Car.find({location, isAvaliable: true})

        //check car availability of car for given date range using promise
        const availableCarPromise = cars.map(async(car)=> {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car.doc, isAvailable: isAvailable}

        })

        let availableCars = await Promise.all(availableCarPromise);
        availableCars = availableCars.filter(car => car.isAvailable === true)
    res.json({success:true, availableCars})
    } catch (error) {
        console.log(error.message);
        res.send({success:false, message:error.message});
    }
}

//API to create booking 
export const  createBooking = async(req, res) => {
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body
        const isAvailable = await checkAvailability(car, pickupDate, returnDat);
        if(!isAvailable){
            res.json({success:false, message:"car is not available"});
        }
        const carData = await Car.findById(car)

        //calculate price on the base of pickupDate and returnDate;
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDayes = Math.ceil((returned- picked) /(1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDayes;

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})
        res.json({success:true, message:"booking created"});
    } catch (error) {
         console.log(error.message);
        res.send({success:false, message:error.message}); 
    }
}

//API to list user booking
export const getUserBooking = async(req, res) => {
    try {
        const {_id} = req.user;
        const booking = await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true, booking})
    } catch (error) {
        console.log(error.message);
        res.send({success:true, message:error.message});  
    }
}

//API to get owner Booking
export const getOwnerBooking = async(req, res) => {
    try {
       if(req.user.role !== 'owner'){
         res.send({success:false, message:"Unauthorized "});  
       }
       const booking = await Booking.find({owner: req.user._id}).populate('car user')
       .select('-user.password').sort({createdAt:-1}) 
        res.json({success:true, booking})

    } catch (error) {
        console.log(error.message);
        res.send({success:true, message:error.message});  
    }
}

//API for owner to change booking status
export const changeBookingStatus = async(req, res) => {
    try {
       const {_id} = req.user;
       const {bookingId, status} = req.body;

       const booking = await Booking.findById(bookingId);

       if(booking.owner.toString() !== bookingId.toString()){
         res.send({success:false, message:"Unauthorized "}); 
       }
       booking.status = status;
       await booking.save();
 res.send({success:true, message:"booking status changed"});

    } catch (error) {
        console.log(error.message);
        res.send({success:true, message:error.message});  
    }
}
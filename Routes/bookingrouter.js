//1) import express
const express=require('express')

//2) create an object of class router in express
const router = new express.Router()

//3)define path
const Booking = require('../Models/bookingSchema')
const moment=require('moment')

//4) booking
router.post('/bookroom', async (req, res) => {
    const { room,   userid,   fromdate, todate, totalamount, totaldays } = req.body;

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate:moment(fromdate).format('DD-MM-YYYY'),
            todate:moment(todate).format('DD-MM-YYYY'),
            totalamount,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            totaldays,
            transactionid: '1234'
        });

        const booking = await newbooking.save();
      
        res.send('Room Booked Successfully');
    } catch (err) {
     console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ err:"error in processing request" });
    }
});

module.exports = router;
//1) import express
const express = require('express')

//2) create an object of class router in express
const router = new express.Router()

//3)define path
const Booking = require('../Models/bookingSchema')
const Room = require('../Models/roomSchema')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Oxq5VSCjTbQareaKWrw3jFpSRabNxVzCS23Ua0R5erh3bpo7Zcmf1pXBV176e2Z67ICcazfd8GRRmmp260MIxnT00LNObHhKY')

//4) booking
router.post('/bookroom', async (req, res) => {
    console.log(req.body);
    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;


    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payments = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: "inr",
                receipt_email: token.email
            },

            {
                idempotencykey: uuidv4()
            }
        ) 
        if (payments) {
           
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate: moment(fromdate).format('DD-MM-YYYY'),
                    todate: moment(todate).format('DD-MM-YYYY'),
                    totalamount,
                    totaldays,
                    transactionid: '1234',
                  
                    
                });

                const booking = await newbooking.save();
                const roomtemp = await Room.findOne({ _id: room._id })
                roomtemp.currentbookings.push({
                    bookingid: booking._id,
                    fromdate: moment(fromdate).format('DD-MM-YYYY'),
                    todate: moment(todate).format('DD-MM-YYYY'),
                    userid: userid,
                    status: booking.status
                })
                await roomtemp.save()
               
            
        }
        res.send("payment successfull,your room is booked")
    } catch (err) {
        return res.status(400).json({ err })
    }











});

module.exports = router;
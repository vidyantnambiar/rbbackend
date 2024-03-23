const {config}=require('dotenv')




//1) import dotenv
require('dotenv').config()

//2) import express
const express=require('express')

//4) create server
const rbserver=express()
// in rb video
require('./DB/connections')
// import router
const router=require('./Routes/router')
const userroute=require('./Routes/userrouter')
const bookingroute=require('./Routes/bookingrouter')
//6) use middleware to convert json to js object
rbserver.use(express.json())


rbserver.use('/api/rooms',router)
rbserver.use('/api/users',userroute)
rbserver.use('/api/bookings',bookingroute)

//3) import cors
const cors=require('cors')







//5) use/inject cors to rbserver
rbserver.use(cors())



//7) define PORT
const PORT =5000

//8) run the server
rbserver.listen(PORT,()=>{
    console.log("server is up and running in port 5000");
})
rbserver.get('/',(req,res)=>{
    res.send("room booking server running successfully")
})


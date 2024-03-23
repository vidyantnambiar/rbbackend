// import mongoose

const mongoose=require('mongoose')

//get connection string from .env
const connectionString=process.env.DATA_BASE;

//connect to mongodb using mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log("mongoDB connected successfully");
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
})
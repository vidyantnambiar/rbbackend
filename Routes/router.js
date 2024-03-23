//1) import express
const express=require('express')

//2) create an object of class router in express
const router=new express.Router()

//3) define path
const Room=require('../Models/roomSchema')

//4) fetch all details of rooms
router.get("/getallrooms",async(req,res)=>{
try{
    const rooms=await Room.find({})
  res.send(rooms)
}catch(err){
    return res.status(400).json({message:err})
}
})

//4) fetch room by id
router.post("/getroombyid",async(req,res)=>{
   const roomid=req.body.roomid
  try{
      const room=await Room.findOne({_id:roomid})
    res.send(room)
  }catch(err){
      return res.status(400).json({message:err})
  }
  }) 

 
  



module.exports=router;
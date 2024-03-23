//1) import express
const express = require('express')

//2) create an object of class router in express
const router = new express.Router()

//3)define path
const User = require('../Models/userSchema')


//4) register
router.post('/register', async (req, res) => {
    const newuser = new User(req.body)//not destructuring coz it we use the same variable as in the model and frontend,we can directly send the values
    // const {name,email,password}=req.body
    // console.log(name,email,password)
    try {
        const user = await newuser.save()
        res.send("user registered successfully")
    } catch (err) {
        return res.status(400).json({ err })
    }
})

//5)login
router.post('/login', async (req, res) => {
    const { email, password } = req.body//destructuring

    try {
        const user = await User.findOne({ email: email, password: password })
        if(user){ // user indangil mathrm login illengil error message
        
            const temp={
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }

                    res.send(temp)
        }
        else{
            return res.status(400).json("login failed")
        }
       
    } catch (err){
        return res.status(400).json({ message: err })
    }
})
module.exports=router

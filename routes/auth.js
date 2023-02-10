const express = require("express")
const router=express.Router()
const user=require("../models/user")
const bcrypt=require("bcrypt")


//REGISTER
router.post("/register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass= await bcrypt.hash(req.body.password,salt)
        const newuser= new user({
            username:req.body.username,
            email:req.body.email,
            password:hashPass
        })
        await newuser.save();
        res.send("user saved successfully");
    }
    catch(err){
        res.status(400).json(err)
    } 
})

//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const myuser=await user.findOne({email:req.body.email});
        !myuser && res.status(400).json("Wrong credentials !!");
        const validated= await bcrypt.compare(req.body.password,myuser.password);
        !validated && res.status(400).json("Wrong credentials !!");
        res.status(200).json(myuser);

    }
    catch(err){   
        res.status(400).json(err);
    }
})

module.exports=router
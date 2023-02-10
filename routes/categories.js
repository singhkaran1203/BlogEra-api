const express=require("express");
const router = express.Router();
const categories=require("../models/categories")


router.post("/",async (req,res)=>{
    const newCat=new categories(req.body);
    try{
        await newCat.save();
        res.status(200).json()
    } catch(err){
        res.status(400).json(err)
    }
})

router.get("/",async (req,res)=>{
    try{
        const cats=await categories.find();
        res.status(200).json(cats);
    }
    catch(err){
        res.status(400).json(err);
    }
})


module.exports=router
const e = require("express");
const express = require("express");
const router = express.Router();
const post = require("../models/post");
const { findByIdAndUpdate, findByIdAndDelete, findById } = require("../models/user");

//UPLOAD
router.post("/", async (req, res) => {
  try {
    const newpost = new post(req.body);
    await newpost.save();
    res.status(200).json("post uploaded successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const mypost = post.findById(req.params.id);
    if (mypost.userid === req.body.userid) {
      try {
        const updatedPost = await post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(400).json(err);
      }
    } else {
      res.status(401).json("you can update only your post");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const mypost = await post.findById(req.params.id);
    if (mypost.userid === req.body.userid) {
      try {
        await post.findByIdAndDelete(req.params.id);
        res.status(200).json("post deleted");
      } catch (err) {
        res.status(400).json(err);
      }
    } else {
      res.status(401).json("you can delete only your post");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET POST
router.get("/:id",async (req,res)=>{
    try{
        const mypost=await post.findById(req.params.id);
        res.status(200).json(mypost)
    }
    catch(err){
        res.status(400).json(err)
    }
})

//GET ALL POSTS
router.get("/",async (req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await post.find({username})
        }
        else if(catName){
            posts = await post.find({categories:{
                $in:[catName]
            },})
        }
        else {
            posts= await post.find()
        }
        res.status(200).json(posts)
    }
    catch(err){
        res.status(400).json({err})
    }
})


module.exports = router;

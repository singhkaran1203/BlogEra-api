const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/user");
const post = require("../models/post")

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      req.body.password=hashPass;
    }
    try {  
      const updatedUser =  await user.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(401).json("you can only update in your account");
  }
});


//DELETE
router.delete("/:id",async (req,res)=>{
    if (req.body.userID === req.params.id) {
        try {  
          const User =  await user.findById(req.params.id)
          if(User){
            await post.deleteMany({username:User.username})
            await user.findByIdAndDelete(req.params.id);
            res.status(201).json("user deleted successfully");
          }
          else
          res.status(200).json("user dosen't exist");
        } catch (err) {
          res.status(400).json(err);
        }
      } else {
        res.status(401).json("you can only update in your account");
      }
})



module.exports=router

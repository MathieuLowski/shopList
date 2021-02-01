//  The routes folder contains the folder with different routes of you application. In this
//  file you will find the homepage route .get("/"), the signup .post("signup") route,   
//  Once the connection is established you get a return code 

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup",(req, res)=>{
    console.log("Name=",req.body.name);
    const {name, email, password} = req.body;
    if (!email || !password || !name){
        return res.status(422).json({ error:"Please add all the fields"});
    }
   User.findOne({email:email})
   .then((savedUser)=>{
       if(savedUser){
        return res.status(422).json({ error:"User already exists with that email"});
   }
   //bcrypt password hash method
bcrypt.hash(password,12)
.then(hashedpassword=>{
    const user = new User({
        email, 
        password:hashedpassword,
        name
    })
    
    user.save()
    .then(user=>{
        res.json({message:"saved successfully"})
    })
    .catch(err=>console.log(err))
    })
})
.catch(err=>{console.log(err)})
})

router.post("/signin",(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please enter email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               // res.json({status:200, message:"Successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id, name, email}= savedUser
               res.json({token, user:{_id, name, email}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"});
            }      
          })
          .catch(err=>{
              console.log(err);
          })
    })
})

module.exports = router;
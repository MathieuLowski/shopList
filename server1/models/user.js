//  This is kind of a blueprint you are creating about what 
//  structure of data you will be sending to Mongo.
//  In this case it is a variable called userSchema that
//  holds name, email and password as info.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("User", userSchema);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require("./config/keys");

mongoose.connect(MONGOURI,{
    useNewUrlParser:true, 
    useUnifiedTopology: true
});
mongoose.connection.on("connected",()=>{
    console.log("Connected yeahhhhhhh");
});
mongoose.connection.on("error", (err)=>{
    console.log("Uhh Ohh Attentione, error de conexion", err);
});

//  You require the user from user.js. 
//  Remember this is your blueprint of how a new user is supose to "looklike" 
require("./models/user");
require("./models/post");

//  express.json() is a method inbuilt in express to 
//  recognize the incoming Request Object as a JSON Object.
//  In this application it is a middleware
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

if(process.env.node_env==="production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("Server is runnin on", PORT);
});

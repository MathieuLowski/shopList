
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post")

router.get("/allpost", requireLogin, (req, res)=>{
    Post.find() //Finds all the posts in Mongo
    .populate("postedBy","_id name") //Populates the field postedBy with : _id & name
    .then(posts=>{
        res.json({status:200, posts});
    })
    .catch(err=>{
        console.log(err);
    });
});

//This end point will be used to add items on the shopping list.
router.post("/createpost",requireLogin,(req, res)=>{
    const {item} = req.body;
    console.log("Item to buy", item)
    if(!item){
      return  res.status(422).json({status:422, error:"PLease add all the fields"});
    }
    console.log("REQ.USER",req.user)
    
   // res.send("OKKKK")
    req.user.password = undefined;
  
    const post = new Post({
        item, 
        postedBy:req.user
    })
    post.save().then(result=>{
        console.log("RESULTS", result)
        res.json({message:"Item added",post:result});
    })
    .catch(err=>{
        console.log("an error has occured",err);
    });
});

router.get("/myposts", requireLogin,(req, res)=>{
    Post.find({postedBy:req.user._id}) //Looks for posts made by this define _id
    .populate("postedBy", "_id name")
    .then(posts=>{
        res.json({status:200, posts})
    })
    .catch(err=>{
        console.log(err);
    });
});

router.delete("/deleteitem/:postId", requireLogin, (req, res) =>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(res=>{
                res.json({message:"successfully deleted", result})
            }).catch(err=>{
                console.log("OUPS",err)
            })
        }
    })
})

module.exports = router;
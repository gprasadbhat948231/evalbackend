const express=require("express")
const {PostsModel}=require("../module/posts.module");

const postsRouter=express.Router()

postsRouter.get("/",async(req,res)=>{
    let device1=req.query.device1;
    let device2=req.query.device2;
    if(device1 && device2)
    {
        try{
            const data=await PostsModel.find({$and:[{device:device1},{device:device2}]})
            res.send(data)
        }
        catch(err)
        {
            console.log(err)
            console.log("Please Login")
        }
    }
    else if(device1)
    {
        try{
            const data=await PostsModel.find({device:device1})
            res.send(data)
        }
        catch(err)
        {
            console.log(err)
            console.log("Please Login")
        }
    }
    else
    {
        try{
            const data=await PostsModel.find()
            res.send(data)
        }
        catch(err)
        {
            console.log(err)
            console.log("Please Login")
        }
    }
})

postsRouter.post("/addpost",async(req,res)=>{
    const post=req.body;
    try{
        const posts=new PostsModel(post)
        await posts.save()
        res.send(posts)
    }
    catch(err)
    {
        console.log(err)
        console.log("Error while posting")
    }
})

postsRouter.patch("/update/:id",async(req,res)=>{
    const updatedpost=req.body;
    const id=req.params.id
    const post=await PostsModel.findOne({"_id":id})
    const userID_post=post.userID;
    const editors_id=req.body.userID
    try{
        if(userID_post!=editors_id)
        {
            res.send("You cannot update others post")
        }
        else{
            await PostsModel.findByIdAndUpdate({"_id":id},updatedpost)
            res.send("Post has been updated")
        }
    }
    catch(err)
    {
        console.log(err)
        console.log("Error while updating the data")
    }
})


postsRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const post=await PostsModel.findOne({"_id":id})
    const userID_post=post.userID;
    const editors_id=req.body.userID
    try{
        if(userID_post!=editors_id)
        {
            res.send("You cannot delete others post")
        }
        else{
            await PostsModel.findByIdAndDelete({"_id":id})
            res.send("Post has been updated")
        }
    }
    catch(err)
    {
        console.log(err)
        console.log("Error while updating the data")
    }
})

module.exports={postsRouter}
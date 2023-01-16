const express=require("express");
require("dotenv").config()
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

const {UserModel}=require("../module/user.module")

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
        bcrypt.hash(password,5,async(err,password)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                const user=new UserModel({name,email,gender,password})
                await user.save()
                res.send("Registration Successful")
            }
        })

    }
    catch(err)
    {
        console.log(err)
        console.log("error while registering")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email})
        if(user.length>0)
        {
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result)
                {
                    const token=jwt.sign({userID:user[0]._id},process.env.key,{expiresIn:60*60})
                    res.send({"token":token})
                }
            })
        }
        else{
            res.send("Wrong Credentials")
        }
    }
    catch(err)
    {
        console.log(err)
        console.log("Wrong Credentials")
    }
})

module.exports={userRouter}
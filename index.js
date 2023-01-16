const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {authenticate}=require("./middlewares/post.middleware")
const { postsRouter } = require("./routes/post.route")
require("dotenv").config()
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postsRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to Database")
    }
    catch(err)
    {
        console.log(err)
        console.log("error while running port")
    }
})
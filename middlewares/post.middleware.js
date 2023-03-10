const jwt=require("jsonwebtoken");

require("dotenv").config()

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token)
    {
        try{
            const decoded=jwt.verify(token,process.env.key)
            if(decoded)
            {
                const userID=decoded.userID;
                req.body.userID=userID
                next()
            }
            else{
                res.send("Please login")
            }
        }
        catch(err)
        {
            console.log(err)
            console.log("Somthing is wrong with your token")
        }
    }
}

module.exports={authenticate}
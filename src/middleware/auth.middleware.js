const jwt=require("jsonwebtoken")
const User=require("../models/users.js");

const protectRoute=async (req,res,next)=>{
    const token=req.cookies.jwt

    if(!token){
        return res.status(401).json("Unauthorized")
    }
const decoded=jwt.verify(token,process.env.JWT_SECRET)

const user =await User.findById(decoded.userId ).select("-password");
// console.log("Decoded user ID from token:", user)
req.user=user
next()
}

const AssignRole= async(req,res,next)=>{
    const userId=req.user._id
    const user=await User.findById(userId)
    if(user.active === 0){
        return res.status(403).json("Forbidden: User account is inactive");
    }
    req.userRole = user.role;
    next();
}

module.exports={protectRoute, AssignRole}
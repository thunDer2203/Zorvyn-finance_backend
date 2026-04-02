const router=require("express").Router()
const bcrypt=require("bcryptjs")
// const { connectDB } = require("../lib/db.js");
const { generateToken } = require("../lib/utils.js");
const User=require("../models/users.js");
const { protectRoute,AssignRole } = require("../middleware/auth.middleware.js");


router.post("/signup",protectRoute, AssignRole, async (req,res)=>{


const userRole= req.userRole;

if(userRole !== 'admin') {
    return res.status(403).json("Forbidden: Only admins can create new users");
}
const {username,email,password,role,active}=req.body
if(!username || !email || !password){
   return res.status(400).json("All fields are required") 
}
if(password.length<6){  
    return res.status(400).json("Password must be at least 6 characters long") 
}
newEmail=email.toLowerCase();
const data=await User.findOne({email: newEmail})
// console.log(data)
if(data){
    return res.status(409).json("User already exists")
}

const salt=bcrypt.genSaltSync(10)
const hashedPass= bcrypt.hashSync(password,salt)
const newUser=new User({username,email:newEmail,password:hashedPass,role,active})

if(newUser){
    await newUser.save()
    res.json({"message": "User created successfully","status": 201})
}    
})


router.post("/login",async (req,res)=>{
    // console.log(req.body)
    const {email,password}=req.body
    // console.log(email,password)
    if(!email || !password){
        return res.status(400).json("All fields are required")
    }
    const user=await User.findOne({email})
    // console.log("User found in DB:", user)
    if(!user){
        return res.status(404).json("User not found")
    }
    const isCorrect=await bcrypt.compare(password,user.password)

    // console.log("Password match result:", isCorrect)

    if(!isCorrect){
        return res.status(401).json("Invalid credentials")
    }
    generateToken(user._id,res)

    // console.log("User logged in:", user._id)

    res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email
    })
})


router.post("/logout",(req,res)=>{
    try{
    res.clearCookie("jwt",{
        httpOnly:true,
        secure:process.env.NODE_ENV!=="development",
})
res.status(200).json("Logged out successfully")
    }catch(error){
        console.error("Error during logout:",error)
        res.status(500).json("Internal server error")
    }   
})

router.put("/update/:id", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;

    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can update user information");
    }

    const { id } = req.params;
    const {  username,role, active,password } = req.body;

    try {
        const updatedUser = await User.findById(id)
        console.log(updatedUser)
        updatedUser.username = username !== undefined ? username : updatedUser.username;
        updatedUser.role= role !==undefined ? role : updatedUser.role ;
        updatedUser.active= active !== undefined ? active : updatedUser.active;
        if (password !== undefined && password.length>6) {
            const salt = bcrypt.genSaltSync(10);
            updatedUser.password = bcrypt.hashSync(password, salt);
        }

        await updatedUser.save();
          
        res.status(200).json("user updated successfully");
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});


router.get("/users", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;

    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can view user information");
    }

    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

router.delete("/delete/:id", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;
    const password=req.body.password;

    console.log(req.user._id)

    if(!password){
        return res.status(400).json("Password is required for deletion");
    }

    const user=await User.findById(req.user._id);
    console.log("User found in DB for deletion:", user)
    const isCorrect=await bcrypt.compare(password,user.password);

    if(!isCorrect){
        return res.status(401).json("Invalid credentials");
    }


    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can delete users");
    }

    try {
        const {id}=req.params
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json("User deleted successfully");
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

module.exports= router
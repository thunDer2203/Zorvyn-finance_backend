const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { protectRoute, AssignRole } = require("../middleware/auth.middleware.js");
const User = require("../models/users.js");
const { getUsers } = require("../controllers/getUsers.js");

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



router.get("/getusers", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;

    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can view user information");
    }

    try {
        getUsers(req, res);
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
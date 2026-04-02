const router=require("express").Router()
const bcrypt=require("bcryptjs")
// const { connectDB } = require("../lib/db.js");
// const { generateToken } = require("../lib/utils.js");
// const User=require("../models/users.js");
const { protectRoute,AssignRole } = require("../middleware/auth.middleware.js");
const Record=require("../models/records.js");
const User=require("../models/users.js");
const {getFiltered}=require("../controllers/filters.js")
const { getSummary } = require("../controllers/summary.js");


router.post("/add", protectRoute, AssignRole, async (req, res) => {
    // Finance-related logic here
    const userRole= req.userRole;

    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can add records");
    }
    const { amount, category, date, notes, type } = req.body;
    try {
        const newRecord = new Record({
            amount,
            category,
            date,
            notes,
            type,
            userId: req.user._id,
            createdBy: req.user.username
        });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: "Error adding record", error });
    }
});

router.get("/getsummary", protectRoute, getSummary);

// router.get("/view", protectRoute,AssignRole, async (req, res) => {
//     // Finance-related logic here
//     const userRole= req.userRole;
//     if(userRole !== 'admin' && userRole !== 'analyst') {
//         return res.status(403).json("Forbidden: Only admins and analysts can view records");
//     }
//     try {
//         const records = await Record.find({});
//         res.status(200).json(records);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching records", error });
//     }
// });


router.put("/update/:id", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;

    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can update user information");
    }

    const { id } = req.params;
    // console.log(id)
    const {  amount,category,date,notes,type } = req.body;

    try {
        const updatedRecord = await Record.findById(id)
        updatedRecord.amount = amount !== undefined ? amount : updatedRecord.amount;
        updatedRecord.category = category !==undefined ? category : updatedRecord.category ;
        updatedRecord.date = date !== undefined ? date : updatedRecord.date;
        updatedRecord.notes = notes !== undefined ? notes : updatedRecord.notes;
        updatedRecord.type = type !== undefined ? type : updatedRecord.type;
        updatedRecord.userId = req.user._id;
        updatedRecord.createdBy = req.user.username;

        await updatedRecord.save();
          
        res.status(200).json("record updated successfully");
    } catch (error) {
        res.status(500).json({ message: "Error updating record", error });
    }
});


router.delete("/delete/:id", protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;
    const password=req.body.password;

    // console.log(req.user._id)

    if(!password){
        return res.status(400).json("Password is required for deletion");
    }

    const user=await User.findById(req.user._id);
    // console.log("User found in DB for deletion:", user)
    const isCorrect=await bcrypt.compare(password,user.password);

    if(!isCorrect){
        return res.status(401).json("Invalid credentials");
    }


    if(userRole !== 'admin') {
        return res.status(403).json("Forbidden: Only admins can delete users");
    }

    try {
        const {id}=req.params
        const deletedRecord = await Record.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json("Record not found");
        }
        res.status(200).json("Record deleted successfully");
    } catch (error) {
        res.status(500).json({ message: "Error deleting Record", error });
    }
});


router.get('/records', protectRoute, AssignRole, async (req, res) => {
    const userRole= req.userRole;
    if(userRole !== 'admin' && userRole !== 'analyst') {
        return res.status(403).json("Forbidden: Only admins and analysts can view records");
    }

    getFiltered(req, res);

});


module.exports=router
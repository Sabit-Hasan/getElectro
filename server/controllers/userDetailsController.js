const User = require("../models/UserModel");

const userDetails = async (req, res) => {
    try {
        const userData = req.user;
        
        const role = userData.role;
        
        if (role !== "Admin") { 
            throw new Error("You can't access the private data!");
        }
        const data = await User.find({}, '-password');

        res.json({ data, success: true, error: false, message: "All user data get successfully!" });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

module.exports = userDetails;
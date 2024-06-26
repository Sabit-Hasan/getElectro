const User = require("../models/UserModel");

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        const currentUser = req.user;

        if (!currentUser || !currentUser.role === "Admin") {
            throw new Error("You must be an admin!")
        }

        if (currentUser.role === 'Admin' && currentUser.id.toString() === userId) {
            throw new Error("You can't update yourself!");
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
        
        if (!updatedUser) {
                throw new Error("User not found!");
            }
            
            res.json({ success: true, error: false, message: "User role updated successfully", user: updatedUser });

        } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

module.exports = updateUser;

const User = require("../models/UserModel");

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        res.json({message: "User deleted successfully!", success: true, error: false, user:deletedUser});
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false,
            error: true
        })
    }
}

module.exports = deleteUser;
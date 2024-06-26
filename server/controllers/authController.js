const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// User Registration Controller
const userRegister = async (req, res) => {
    try {
        const { userName, email, password, profilePic } = req.body;
        const userExist = await User.findOne({ email });

        if (!userName || !email || !password) {
            throw new Error("Please fill all the fields.");
        };

        if (userExist) {
            throw new Error("A user already exists with this email address!");
        };

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ userName, email, password: hashPassword, profilePic });

        res.status(200).json({
            success: true,
            error: false,
            message: 'User created successfully!'
        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, error: true, message: errors.join(', ') });
        }
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

// User Login Controller
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Please fill all the input fields!");
        };

        const userExist = await User.findOne({ email });

        if (!userExist) {
            throw new Error("User not found!");
        };

        const comparePassword = await bcrypt.compare(password, userExist.password);

        if (comparePassword) {
            const tokenData = {
                id: userExist._id,
                email: userExist.email,
                role: userExist.role
            }

            const expiresIn = 60 * 60 * 7; // 7 hours
            const token = await jwt.sign({ tokenData }, process.env.JTW_SECRET_KEY, { expiresIn });

            const user = { id: userExist._id, email: userExist.email, userName: userExist.userName, profilePic: userExist.profilePic, role: userExist.role };

            res.json({
                message: "Login successful!",
                token,
                user,
                success: true,
                error: false
            })
        } else {
            throw new Error("Your password is wrong!");
        }

    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = { userRegister, userLogin };
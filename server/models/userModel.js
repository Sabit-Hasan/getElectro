const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(value) {
                // Regular expression to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: props => `Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long!`
        }
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

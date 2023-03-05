const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: [true, "Username already taken"],
        minLength: [3, "Username must be between 3 and 15 characters"],
        maxLength: [15, "Username must be between 3 and 15 characters"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, "Email already registered"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Must be valid email address"],
        maxLength: [150, "Email too long"]
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        min: 0
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
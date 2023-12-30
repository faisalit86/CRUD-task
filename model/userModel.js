const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null,
    },
    last_name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

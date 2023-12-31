const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const TaskSchema = new mongoose.Schema({
    user_id:{
        type:ObjectId,
        ref:"User"
    },
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    due_date: {
        type: String,
        required: [true, "Due Date is required"],
    },
    status: {
        type: String,
        // required: [true, "Password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel;


const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
});

module.exports = mongoose.model("Task", TaskSchema);

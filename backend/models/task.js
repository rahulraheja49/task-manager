const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["new", "inprogress", "completed"],
      default: "new",
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subtask",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;

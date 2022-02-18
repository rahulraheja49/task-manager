const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["new", "inprogress", "completed", "archive"],
    },
    subtasks: [
      {
        description: {
          type: String,
          required: true,
        },
        complete: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;

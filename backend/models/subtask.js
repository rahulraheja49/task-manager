const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "task",
    },
    description: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subtask = mongoose.model("subtask", subtaskSchema);

module.exports = Subtask;

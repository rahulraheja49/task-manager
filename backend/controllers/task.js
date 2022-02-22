const chalk = require("chalk");

const Task = require("../models/task");
const Subtask = require("../models/subtask");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    new Task({
      user: req.user._id,
      title,
      description,
      subtasks: [],
    })
      .save()
      .then((newTask) => {
        return res.status(200).send(newTask);
      });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false });
  }
};

const getTasks = async (req, res) => {
  try {
    const newTasks = await Task.find({ type: "new", user: req.user._id }).sort({
      createdAt: "desc",
    });
    const inprogressTasks = await Task.find({
      type: "inprogress",
      user: req.user._id,
    })
      .sort({ createdAt: "desc" })
      .limit(10);
    const archivedTasks = await Task.find({
      type: "inprogress",
      user: req.user._id,
    })
      .sort({ createdAt: "desc" })
      .skip(10);
    const completedTasks = await Task.find({
      type: "completed",
      user: req.user._id,
    }).sort({ createdAt: "desc" });
    return res
      .status(200)
      .send({ newTasks, inprogressTasks, archivedTasks, completedTasks });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false, err });
  }
};

const addSubtask = async (req, res) => {
  const { task_id, description } = req.body;
  const session = await Subtask.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const newSubtask = await Subtask.create([{ description, task_id }], opts);
    const updatedTask = await Task.findByIdAndUpdate(
      task_id,
      {
        $addToSet: {
          subtasks: newSubtask,
        },
        $set: {
          type: "inprogress",
        },
      },
      { returnDocument: "after" }
    );
    await session.commitTransaction();
    session.endSession();
    const task = await Task.findById(task_id).populate("subtasks");
    return res.status(200).send(task);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false });
  }
};

const markSubtaskAsComplete = async (req, res) => {
  try {
    const { subtask_id } = req.body;
    const updatedSubtask = await Subtask.findByIdAndUpdate(
      subtask_id,
      {
        $set: {
          complete: true,
        },
      },
      { returnDocument: "after" }
    );
    const completedSubtasks = await Subtask.find({
      task_id: updatedSubtask.task_id,
      complete: false,
    });
    if (completedSubtasks.length === 0) {
      const updatedTask = await Task.findByIdAndUpdate(
        updatedSubtask.task_id,
        { type: "completed" },
        { returnDocument: "after" }
      );
      return res.status(200).send({ updatedSubtask, taskComplete: true });
    }
    return res.status(200).send({ taskComplete: false, updatedSubtask });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false });
  }
};

const getTaskDetails = async (req, res) => {
  try {
    const id = req.query.task_id;
    const task = await Task.findById(id).populate("subtasks");
    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "Internal server error", success: false });
  }
};

module.exports = {
  createTask,
  getTasks,
  addSubtask,
  markSubtaskAsComplete,
  getTaskDetails,
};

// Task.findByIdAndUpdate(
//   task_id,
//   {
//     $addToSet: {
//       subtasks: {
//         description,
//       },
//     },
//   },
//   (err, task) => {
//     if (err) {
//       res.status(401).send({ success: false, err: error });
//     }
//     return res.status(200).send({ success: true, msg: "Subtask added" });
//   }
// );

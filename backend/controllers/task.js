const chalk = require("chalk");

const Task = require("../models/task");

const createTask = (req, res) => {
  try {
    const {} = req.body;
    new Task({});
  } catch (err) {
    res.status(500).send({ msg: "Internal server error", success: false });
  }
};

module.exports = { createTask };

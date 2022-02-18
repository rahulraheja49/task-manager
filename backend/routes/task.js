const router = require("express").Router();

const controller = require("../controllers/task");
const { userAuth } = require("../middleware/auth");

const { createTask } = controller;

router.use(userAuth);

router.post("/createTask", createTask);

module.exports = router;

const router = require("express").Router();

const controller = require("../controllers/task");
const { userAuth } = require("../middleware/auth");

const {
  createTask,
  getTasks,
  addSubtask,
  markSubtaskAsComplete,
  getTaskDetails,
} = controller;

router.use(userAuth);

router.post("/create", createTask);

router.get("/getTasks", getTasks);

router.post("/addSubtask", addSubtask);

router.post("/markSubtaskAsComplete", markSubtaskAsComplete);

router.get("/", getTaskDetails);

module.exports = router;

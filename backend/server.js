require("dotenv").config();

const express = require("express");
const chalk = require("chalk");
const cors = require("cors");

const app = express();
const db = require("./config/db");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

db();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Task Manager" });
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
  console.log(chalk.blue(`Listening on port ${PORT}`));
});

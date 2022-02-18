const router = require("express").Router();

const controller = require("../controllers/user");

const { signup, login } = controller;

router.post("/register", signup);

router.post("/login", login);

module.exports = router;

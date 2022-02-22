const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const generateToken = require("../helpers/generateJWT");

exports.signup = async (req, res) => {
  try {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    const { email, fullName } = req.body;

    User.findOne({ email }).then((currentUser) => {
      if (currentUser) {
        return res.status(400).send({
          msg: "User already exists, please log in instead",
          success: false,
        });
      } else {
        new User({
          email,
          fullName,
          password: securePassword,
        })
          .save()
          .then((newUser) => {
            console.log("new user is:", newUser);

            return res.status(200).send({
              token: generateToken(newUser._id),
              success: true,
              user: newUser,
            });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(400)
              .send({ msg: "Some error required", success: false });
          });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({
      email: username,
    });

    if (!user) {
      return res.send({ status: "error", msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.send({
        token: generateToken(user._id),
        user,
        success: true,
      });
    }

    return res.send({
      status: "error",
      msg: "Invalid username/password",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error", err });
  }
};

const express = require("express");
const router = express.Router();
const db = require("../models");
router.use(express.json());

// functions for create users and find users

const findUserByEmail = async (email) =>
  await db.user.findOne({ where: { email: email } }).then(function (userData) {
    if (userData) {
      return userData.toJSON();
    } else {
      return false;
    }
  });

router.post("/login", (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    return res.status(401).json({
      error: "User name or password required",
    });
  }
});

router.post("/signup", async (req, res) => {
  // set formats
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordFormat = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;
  // grab email and lower case it and password
  email = req.body.email.toLowerCase();
  password = req.body.password;
  // ensure email and password are filled out
  if (email === "" || req.body.password === "") {
    return res.status(401).json({
      error: "Email or password required",
    });
  }
  // validate email formatting
  if (!emailFormat.test(email)) {
    return res.status(401).json({
      error: "Invalid email",
    });
  }
  // validate password
  if (!passwordFormat.test(password)) {
    return res.status(401).json({
      error:
        "Password must be at least 8 characters long, contain an uppercase, lowercase, and number",
    });
  }
  // check if user exists already
  const isUserAlready = await findUserByEmail(email);
  if (isUserAlready) {
    return res.status(403).json({
      error: "An account already exists with this email address",
    });
  }
});

module.exports = router;

require("dotenv").config();

const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const crypto = require("crypto");
const db = require("../models");
const jwt = require("jsonwebtoken");
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

const encryptPassword = (word, pass_salt) => {
  let salt = pass_salt ? pass_salt : crypto.randomBytes(20).toString("hex");
  let password = word;
  let key = pbkdf2.pbkdf2Sync(password, salt, 36000, 256, "sha256");
  let hash = key.toString("hex");

  return `$${salt}$${hash}`;
};

router.post("/login", async (req, res) => {
  if (req.body.username === "" || req.body.password === "") {
    return res.status(401).json({
      error: "User name or password required",
    });
  }
  // grab email and lower case it and password
  let email = req.body.email.toLowerCase();
  let password = req.body.password;

  //find user
  let foundUser = await findUserByEmail(email);
  let userPassword = foundUser.password;

  if (!foundUser) {
    return res.status(401).json({
      error: "User not found",
    });
  }

  let pass_parts = userPassword.split("$");
  let enteredPassword = encryptPassword(password, pass_parts[1]);
  if (enteredPassword == userPassword) {
    const accessToken = jwt.sign(foundUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "12h",
    });
    return res.status(200).json({
      accessToken: accessToken,
    });
  } else {
    return res.status(401).json({
      error: "wrong password",
    });
  }
});

router.post("/signup", async (req, res) => {
  // set formats
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordFormat = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;
  // grab email and lower case it and password
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
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
    return res.status(403).send("email already exists");
    // return res.status(403).json({
    //   error: "An account already exists with this email address",
    // });
  }

  let encryptedPasword = encryptPassword(password);
  db.user
    .create({
      email: email,
      password: encryptedPasword,
      userName: req.body.username ? req.body.username : null,
    })
    .then((createdUser) => {
      let jsonCreatedUser = createdUser.toJSON();
      const accessToken = jwt.sign(
        jsonCreatedUser,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "12h",
        }
      );

      return res.status(201).json({
        accessToken: accessToken,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        error: `${err}`,
      });
    });
});

module.exports = router;

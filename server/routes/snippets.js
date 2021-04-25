const express = require("express");
const router = express.Router();
const db = require("../models");
router.use(express.json());

// get User's snippets

router.get("/user/snippets", (req, res) => {
  res.send("hey");
});

router.post("/user/snippets", (req, res) => {
  res.send("hey");
});

router.put("/user/snippets/:id", (req, res) => {
  res.send("hey");
});

router.delete("/user/snippets/:id", (req, res) => {
  res.send("hey");
});

module.exports = router;

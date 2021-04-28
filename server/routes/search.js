require("dotenv").config();

const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const authenticateToken = require("./helper/authenticateToken");
router.use(express.json());

router.get("/search", authenticateToken, (req, res) => {
  let serachTerms = req.query;
  let search = Object.keys(serachTerms)[0];
  let value = serachTerms[Object.keys(serachTerms)[0]];
  let user_id = req.user.id;

  db.snippet
    .findAll({
      where: {
        user_id: user_id,
        [search]: {
          [Op.substring]: value,
        },
      },
    })
    .then((data) => {
      return res.status(200).json({ snippets: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Some error occured",
      });
    });
});

module.exports = router;

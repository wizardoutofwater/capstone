require("dotenv").config();

const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const authenticateToken = require("./helper/authenticateToken");
router.use(express.json());

router.get("/search", authenticateToken, (req, res) => {
  let searchTerms = req.query;
  let search = Object.keys(searchTerms)[0];
  let value = searchTerms[Object.keys(searchTerms)[0]];
  let user_id = req.user.id;

  db.snippet
    .findAll({
      where: {
        user_id: user_id,
        [search]: {
          [Op.iLike]: `%${value}%`,
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

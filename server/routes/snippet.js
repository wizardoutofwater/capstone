require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../models");
const joi = require("joi");
const authenticateToken = require("./helper/authenticateToken");
router.use(express.json());

//define schema for snippet routes

snippetSchema = joi.object().keys({
  title: joi.string().empty(""),
  note: joi.string().empty(""),
  snippet: joi.string().required(),
  language_id: joi.number().required(),
  user_id: joi.number().required(),
});

router.get("/api/user/snippets", authenticateToken, (req, res) => {
  let user_id = req.user.id;
  db.snippet
    .findAll({
      where: { user_id: user_id },
    })
    .then((data) => {
      return res.status(200).json({ snippets: data });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.parent.detail || "Some error occured",
      });
    });
});

router.get("/api/user/snippets/:id", authenticateToken, (req, res) => {
  let snippet_id = req.params.id;
  db.snippet
    .findByPk(snippet_id)
    .then((data) => {
      return res.status(200).json({ snippet: data });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.parent.detail || "Some error occured",
      });
    });
});

router.post("/api/user/snippets", authenticateToken, (req, res) => {
  // assigning the user id to the req body
  req.body.user_id = req.user.id;

  // create snippet object for database
  const snippet = req.body;

  const result = snippetSchema.validate(snippet);

  const { value, error } = result;

  const valid = error == null;
  console.log(error);
  if (!valid) {
    res.status(400).json({
      error: error.details[0].message,
    });
  } else {
    db.snippet
      .create(snippet)
      .then((data) => {
        return res.status(200).json({ snippet: data });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.parent.detail || "Some error occured",
        });
      });
  }
});

router.put("/api/user/snippets/:id", authenticateToken, (req, res) => {
  // assigning the user id to the req body

  let snippet_id = req.params.id;

  const snippet = req.body;

  const result = snippetSchema.validate(snippet);

  const { value, error } = result;

  const valid = error == null;
  if (!valid) {
    res.status(400).json({
      error: error.details.message,
    });
  } else {
    db.snippet
      .update(snippet, {
        where: { id: snippet_id },
      })
      .then((data) => {
        console.log(data);
        if (data[0] === 1) {
          return res.status(200).json({ success: "Snippet updated!" });
        } else {
          return res.status(200).json({
            error: `Unable to update snippet with id of ${snippet_id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.parent.detail || "Some error occured",
        });
      });
  }
});

router.delete("/api/user/snippets/:id", authenticateToken, (req, res) => {
  let snippet_id = req.params.id;

  db.snippet
    .destroy({
      where: { id: snippet_id },
    })
    .then((data) => {
      console.log(data);
      if (data === 1) {
        return res.status(200).json({ success: "Snippet deleted!" });
      } else {
        return res
          .status(400)
          .json({ error: `Unable to delete snippet with id of ${snippet_id}` });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err.parent.detail || "Some error occured",
      });
    });
});

router.get("/api/user", authenticateToken, (req, res) => {
  let user_id = req.user.id;
  db.user
    .findByPk(user_id)
    .then((data) => {
      return res.status(200).json({ user: data });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.parent.detail || "Some error occured",
      });
    });
});

module.exports = router;

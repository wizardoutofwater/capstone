require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../models");
const joi = require("joi");
const authenticateToken = require("./helper/authenticateToken");
router.use(express.json());

//define schema for snippet routes

let addSnippetSchema = joi.object().keys({
  title: joi.string().empty(""),
  note: joi.string().empty(""),
  snippet: joi.string().required(),
  language_id: joi.number().required(),
  user_id: joi.number().required(),
});

let updateSnippetSchema = joi.object().keys({
  title: joi.string().empty(""),
  note: joi.string().empty(""),
  snippet: joi.string().required(),
  language_id: joi.number().required(),
});

// pagination 

const getPagination = (page, size) => {
  const limit = size ? size : 10;
  const offset = page ? page * limit : 0;

  return {limit, offset}
}

const getPagingData = (data, page, limit) => {
  const {count: totalSnippits, rows: snippits} = data;
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalSnippits / limit)

  return { totalSnippits, snippits, totalPages, currentPage}
}

router.get("/api/user/snippets", authenticateToken, (req, res) => {
  let user_id = req.user.id;
  const {page, size} = req.query
  const {limit, offset} = getPagination(page, size)

  db.snippet
    .findAndCountAll({
      where: { user_id: user_id },
      limit,
      offset
    })
    .then((data) => {
      console.log("this is the data", data)
      const response = getPagingData(data, page, limit)
      return res.status(200).json({ response });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.parent.detail || "Some error occured",
      });
    });
});

router.get("/api/user/snippets/:id", authenticateToken, (req, res) => {
  let snippet_id = req.params.id;
  let user_id = req.user.id;

  db.snippet
    .findByPk(snippet_id)
    .then((data) => {
      if (data.user_id !== user_id) {
        throw new Error("You don't have permission to view this snippit");
      }
      return res.status(200).json({ snippet: data });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message || "Some error occured",
      });
    });
});

router.post("/api/user/snippets", authenticateToken, (req, res) => {
  // assigning the user id to the req body
  req.body.user_id = req.user.id;

  // create snippet object for database
  const snippet = req.body;

  const result = addSnippetSchema.validate(snippet);

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

router.put("/api/user/snippets/:id", authenticateToken, async (req, res) => {
  let snippet_id = parseInt(req.params.id);

  const snippet = req.body;

  const result = updateSnippetSchema.validate(snippet);

  const { value, error } = result;

  const valid = error == null;

  let owner_id;

  await db.snippet.findByPk(snippet_id).then((data) => {
    owner_id = data.user_id;
  });

  if (!valid) {
    res.status(400).json({
      error: error.details[0].message,
    });
  } else {
    db.snippet
      .update(snippet, {
        where: { id: snippet_id },
        user_id: req.user.id,
        owner_id: owner_id,
      })
      .then((data) => {
        if (data[0] === 1) {
          return res.status(200).json({ success: "Snippet updated!" });
        } else {
          return res.status(200).json({
            error: `Unable to update snippet with id of ${snippet_id}`,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message || "Some error occured",
        });
      });
  }
});

router.delete("/api/user/snippets/:id", authenticateToken, async (req, res) => {
  let snippet_id = req.params.id;
  let owner_id;

  await db.snippet.findByPk(snippet_id).then((data) => {
    let owner_id = data.user_id;
  });

  db.snippet
    .destroy({
      where: { id: snippet_id },
      user_id: req.user.id,
      owner_id: owner_id,
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
        message: err.message || "Some error occured",
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

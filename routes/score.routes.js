const express = require("express");
const router = express.Router();
const db = require("../models");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const scoreController = require("../controller/score.controller");

// get all todos
router.get("/all", (req, res) => {
  db.Score.findAll().then(ScoreModelo => res.send(ScoreModelo));
});

// get single todo by id
router.get("/find/:id", (req, res) => {
  db.Score.findAll({
    where: {
      id: req.params.id
    }
  }).then(ScoreModelo => res.send(ScoreModelo));
});

// post new todo
router.post(
  "/new",
  [
    body("scoreOne")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("The score one must be float")
      .exists()
      .withMessage("The score one is required")
      .trim()
      .escape(),
    body("scoreTwo")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("The score two must be float")
      .exists()
      .withMessage("The score two is required")
      .trim()
      .escape(),
    body("scoreTree")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("The score three must be float")
      .exists()
      .withMessage("The score three is required")
      .trim()
      .escape(),
    body("scoreFour")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("The score four must be float")
      .exists()
      .withMessage("The score four is required")
      .trim()
      .escape(),
    body("idCourse")
      .matches(/^[A-Z]{3}[0-9]{6,15}$/, "i")
      .withMessage("Course id must contain the following format: course code + student id")
      .exists()
      .withMessage("The course id is required")
      .custom((value, { req, loc, path }) => {
        return db.Course.findOne({ where: { idCourse: value } }).then(typeDoc => {
          if (!typeDoc) {
            return Promise.reject('The course id already exists');
          }
        });
      })
  ],
  scoreController.saveScore
);

// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Score.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo

router.put("/edit", (req, res) => {
  db.Score.update(
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});


module.exports = router;

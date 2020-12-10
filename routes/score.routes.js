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
      .withMessage("La calificacion debe estar en decimales")
      .exists()
      .withMessage("La calificacion 1 es requerido")
      .trim()
      .escape(),
    body("scoreTwo")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("La calificacion debe estar en decimales")
      .exists()
      .withMessage("La calificacion 2 es requerido")
      .trim()
      .escape(),
    body("scoreTree")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("La calificacion debe estar en decimales")
      .exists()
      .withMessage("La calificacion 3 es requerido")
      .trim()
      .escape(),
    body("scoreFour")
      .matches(/^[0-9]+([.][0-9]+)?$/, "i")
      .withMessage("La calificacion debe estar en decimales")
      .exists()
      .withMessage("La calificacion 4 es requerido")
      .trim()
      .escape(),
    body("idCourse")
      .matches(/^[A-Z]{3}[0-9]{6,9}$/, "i")
      .withMessage("Foreinkey")
      .exists()
      .withMessage("Foreinkeyes requerida")
      .custom((value, { req, loc, path }) => {
        return db.Course.findOne({ where: { idCourse: value } }).then(typeDoc => {
          if (!typeDoc) {
            return Promise.reject('La categoria no existe.');
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

const express = require("express");
const router = express.Router();
const db = require("../models");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const courseController = require("../controller/course.controller");

// get all todos
router.get("/all", (req, res) => {
  db.Course.findAll().then(todos => res.send(todos));
});

// get single todo by id
router.get("/find/:id", (req, res) => {
  db.Course.findAll({
    where: {
      id: req.params.id
    }
  }).then(todo => res.send(todo));
});

// post new todo
router.post(
  "/new",
  [
    body("name")
      .isLength({ min: 3, max: 50 })
      .withMessage("Ingresa el nombre de la materia;el nombre debe ser de minimo 3 caracteres y maximo 50")
      .matches(/^[A-Za-z0-9_\u00f1\u00d1\s]+$/, "i")
      .withMessage("El nombre de la materia puede ser alfanumerico")
      .exists()
      .withMessage("El nombre de la materia es requerido")
      .trim()
      .escape(),
    body("professor")
      .isLength({ min: 3, max: 50 })
      .withMessage("Ingresa el nombre del profesor; el nombre debe ser de minimo 3 caracteres y maximo 50")
      .matches(/^[A-Za-z\s]+$/, "i")
      .withMessage("El nombre de la materia debe contener solo letras")
      .exists()
      .withMessage("El nombre de la materia es requerido")
      .trim()
      .escape(),
    body("credits")
      .exists()
      .withMessage("Ingresa el numero de creditos de la materia")
      .matches(/^[0-9]+$/, "i")
      .withMessage("El numero de créditos de la materia debe ser de carácter numérico")
      .trim()
      .escape(),
    body("hours")
      .exists()
      .withMessage("Ingresa el numero de horas de la materia")
      .matches(/^[0-9]+$/, "i")
      .withMessage("El numero de horas de la materia debe ser de carácter numérico")
      .trim()
      .escape(),
    body("semester")
      .exists()
      .withMessage("Ingresa el semestre en el que estas cursando la materia")
      .matches(/^[0-9]+$/, "i")
      .withMessage("El semestre en el que estas cursando la materia debe ser de carácter numérico")
      .trim()
      .escape(),
    body("idStudent")
      .matches(/^[0-9]+$/, "i")
      .withMessage("Deben ser carecteres numericos")
      .exists()
      .withMessage("El id es requerido")
      .trim()
      .escape()
  ],
  courseController.saveCourse
);

// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Course.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo

router.put("/edit", (req, res) => {
  db.Course.update(
    {
      text: req.body.text
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});


module.exports = router;

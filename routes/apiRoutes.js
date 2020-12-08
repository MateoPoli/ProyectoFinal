const express = require("express");
const router = express.Router();
const db = require("../models");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const todoController = require("../controller/todo.controller");

// get all todos
router.get("/all", (req, res) => {
  db.Todo.findAll().then(todo => res.send(todo));
});

// get single todo by id
router.get("/find/:id", (req, res) => {
  db.Todo.findAll({
    where: {
      id: req.params.id
    }
  }).then(todo => res.send(todo));
});

// post new todo
router.post(
  "/new",
  [
    body("text")
      .isLength({ min: 2, max: 50 })
      .withMessage("El texto es de minimo 2 caracteres, maximo 50")
      .matches(/^[A-Za-z0-9_\s]+$/, "i")
      .withMessage("El texto debe ser alfanumerico")
      .exists()
      .withMessage("El texto es requerido")
      .trim()
      .escape(),
    body("description")
      .isLength({ min: 2, max: 80 })
      .withMessage("La descripcion es de minimo 2 caracteres, maximo 80")
      .matches(/[A-Za-z0-9_\s]+$/, "i")
      .withMessage("La descripcion debe ser alfabetica")
      .exists()
      .withMessage("La descripcion es requerida")
      .trim()
      .escape(),
    body("version")
      .exists()
      .withMessage("La version es requerida")
      .matches(/^[0-9]+$/, "i")
      .withMessage("La versión debe ser un digito numerico")
      .trim()
      .escape()
  ],
  todoController.saveTodo
);

// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo

router.put("/edit", (req, res) => {
  db.Todo.update(
    {
      text: req.body.text
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});


module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const studentController = require("../controller/student.controller");

// get all todos
router.get("/all", (req, res) => {
  db.Student.findAll({
    include: [
      {
        model: db.Course,
        include: [
          {
            model: db.Score
          }
        ]
      }
    ]
  }).then(students => res.send(students));    
}
);

  // get single todo by id
  router.get("/find/:id", (req, res) => {
    db.Student.findAll({
      where: {
        idStudent: req.params.id
      },
      include: [
        {
          model: db.Course,
          include: [
            {
              model: db.Score
            }
          ]
        }
      ]
    }).then(student => res.send(student));
  });

// post new todo
router.post(
  "/new",
  [
    body("idStudent")
      .matches( /^[0-9]+$/, "i")
      .withMessage("Deben ser carecteres numericos")
      .exists()
      .withMessage("El id es requerido")
      .custom((value, { req, loc, path }) => {
        return db.Student.findOne({ where: { idStudent: value }}).then(typeDoc => {
            if (typeDoc) {
              return Promise.reject('El estudiate ya existe.');
            }
        });
      })
      .trim()
      .escape(),
    body("name")
      .isLength({ min: 2, max: 80 })
      .withMessage("El nombre es de minimo 2 caracteres, maximo 80")
      .matches(/^[A-Za-z0-9_\s]+$/, "i")
      .withMessage("El nombre debe ser alfabetico")
      .exists()
      .withMessage("El nombre es requerido")
      .trim()
      .escape(),
    body("age")
      .matches( /^[0-9]+$/, "i")
      .withMessage("Deben ser carecteres numericos")
      .exists()
      .withMessage("La edad es requerida")
      .trim()
      .escape(),
    body("email")
      .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, "i")
      .withMessage("Caracter invalido")
      .exists()
      .withMessage("El correo electronico es requerido")
      .trim()
      .escape()
  ],
  studentController.saveStudent
  );

// delete todo
router.delete("/delete/:id", (req, res) => {
    db.Student.destroy({
      where: {
        id_student: req.params.id
      }
    }).then(() => res.send("success"));
  });
  
  // edit a todo
  
  router.put("/edit", (req, res) => {
    db.Student.update(
      {
        idStudent: req.body.text
      },
      {
        where: { id: req.body.id }
      }
    ).then(() => res.send("success"));
  });
  
  
  module.exports = router;

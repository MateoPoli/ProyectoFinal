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
      .matches(/^[0-9]+$/, "i")
      .withMessage("The student id must be numbers")
      .exists()
      .withMessage("The student id is required")
      .custom((value, { req, loc, path }) => {
        return db.Student.findOne({ where: { idStudent: value } }).then(typeDoc => {
          if (typeDoc) {
            return Promise.reject('The student is already');
          }
        });
      })
      .trim()
      .escape(),
    body("name")
      .isLength({ min: 10, max: 20 })
      .withMessage("The student's name is a minimum of 10 characters, maximum 20")
      .matches(/^[A-Za-z0-9_\s]+$/, "i")
      .withMessage("The student´s name must containt only letters")
      .exists()
      .withMessage("The student´s name is require")
      .trim()
      .escape(),
    body("age")
      .matches(/^[0-9]+$/, "i")
      .withMessage("The student's age must be numeric characters")
      .exists()
      .withMessage("The student´s age is required")
      .trim()
      .escape(),
    body("email")
      .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, "i")
      .withMessage("Email invalid")
      .exists()
      .withMessage("Email is required")
      .trim()
      .escape()
  ],
  studentController.saveStudent
);

// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Student.destroy({
    where: {
      idStudent: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo

router.put(
  "/edit",
  [
    body("idStudent")
      .matches(/^[0-9]+$/, "i")
      .withMessage("The student id must be numbers")
      .exists()
      .withMessage("The student id is required")
      .custom((value, { req, loc, path }) => {
        return db.Student.findOne({ where: { idStudent: value } }).then(typeDoc => {
          if (!typeDoc) {
            return Promise.reject('Student id does not exist');
          }
        });
      })
      .trim()
      .escape(),
    body("name")
      .isLength({ min: 10, max: 20 })
      .withMessage("The student's name is a minimum of 10 characters, maximum 20")
      .matches(/^[A-Za-z0-9_\s]+$/, "i")
      .withMessage("The student´s name must containt only letters")
      .exists()
      .withMessage("The student´s name is require")
      .trim()
      .escape(),
    body("age")
      .matches(/^[0-9]+$/, "i")
      .withMessage("The student's age must be numeric characters")
      .exists()
      .withMessage("The student´s age is required")
      .trim()
      .escape(),
    body("email")
      .matches(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, "i")
      .withMessage("Email invalid")
      .exists()
      .withMessage("Email is required")
      .trim()
      .escape()
  ],

  studentController.updateStudent

);


module.exports = router;

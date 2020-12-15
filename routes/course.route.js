const express = require("express");
const router = express.Router();
const db = require("../models");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const courseController = require("../controller/course.controller");
const studentModel = require("../models/student.model");

// get all todos
router.get("/all", (req, res) => {
  db.Course.findAll({
    include: [db.Score]
  }).then(courses => res.send(courses));
});

// get single todo by id
router.get("/find/:id", (req, res) => {
  db.Course.findAll({
    where: {
      idCourse: req.params.id
    },
    include: [db.Score]
  }).then(courses => res.send(courses));
});   

// post new todo
router.post(
  "/new",
  [
    body("idCourse")
      .matches(/^[A-Z]{3}[0-9]{6,15}$/, "i")
      .withMessage("Course id must contain the following format: course code + student id")
      .exists()
      .withMessage("The course id is required")
      .custom((value, { req, loc, path }) => {
        return db.Course.findOne({ where: { idCourse: value } }).then(typeDoc => {
          if (typeDoc) {
            return Promise.reject('The course id already exists');
          }
        });
      })
      .trim()
      .escape(),
    body("name")
      .isLength({ min: 10, max: 20 })
      .withMessage("The course´s name must be a minimum of 10 characters and a maximum of 20")
      .matches(/^[A-Za-z0-9_\u00f1\u00d1\s]+$/, "i")
      .withMessage("The course´s name must be alphanumeric")
      .exists()
      .withMessage("The course´s name is required")
      .trim()
      .escape(),
    body("professor")
      .isLength({ min: 8, max: 20 })
      .withMessage("The teacher´s name must be a minimum of 8 characters and a maximum of 20")
      .matches(/^[A-Za-z\s]+$/, "i")
      .withMessage("The teacher´s name must contain only letters")
      .exists()
      .withMessage("The teacher´s name is required")
      .trim()
      .escape(),
    body("credits")
      .matches(/^[0-9]+$/, "i")
      .withMessage("Course credits must be numeric")
      .exists()
      .withMessage("The amount of course credits is required")
      .trim()
      .escape(),
    body("idStudent")
      .matches(/^[0-9]+$/, "i")
      .withMessage("The student id must be numbers")
      .exists()
      .withMessage("The Student id is required")
      .custom((value, { req, loc, path }) => {
        return db.Student.findOne({ where: { idStudent: value } }).then(typeDoc => {
          if (!typeDoc) {
            return Promise.reject('Student id does not exist');
          }
        });
      })
      .trim()
      .escape(),
  ],
  courseController.saveCourse
);


// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Course.destroy({
    where: {
      idCourse: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo

router.put(

  "/edit",
  [
    body("idCourse")
      .matches(/^[A-Z]{3}[0-9]{6,15}$/, "i")
      .withMessage("Course id must contain the following format: course code + student id")
      .exists()
      .withMessage("The course id is required")
      .custom((value, { req, loc, path }) => {
        return db.Course.findOne({ where: { idCourse: value } }).then(typeDoc => {
          if (!typeDoc) {
            return Promise.reject('Course id does not exist');
          }
        });
      })
      .trim()
      .escape(),
    body("name")
      .isLength({ min: 10, max: 20 })
      .withMessage("The course´s name must be a minimum of 10 characters and a maximum of 20")
      .matches(/^[A-Za-z0-9_\u00f1\u00d1\s]+$/, "i")
      .withMessage("The course´s name must be alphanumeric")
      .exists()
      .withMessage("The course´s name is required")
      .trim()
      .escape(),
    body("professor")
      .isLength({ min: 8, max: 20 })
      .withMessage("The teacher´s name must be a minimum of 8 characters and a maximum of 20")
      .matches(/^[A-Za-z\s]+$/, "i")
      .withMessage("The teacher´s name must contain only letters")
      .exists()
      .withMessage("The teacher´s name is required")
      .trim()
      .escape(),
    body("credits")
      .matches(/^[0-9]+$/, "i")
      .withMessage("Course credits must be numeric")
      .exists()
      .withMessage("The amount of course credits is required")
      .trim()
      .escape()
  ],
  courseController.updateCourse

);


module.exports = router;

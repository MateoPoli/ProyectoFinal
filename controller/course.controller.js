const { validationResult } = require("express-validator");
const { sequelize } = require("../models");
const db = require("../models");

exports.saveCourse = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    db.Course.create({
        idCourse: req.body.idCourse,
        name: req.body.name,
        professor: req.body.professor,
        credits: +req.body.credits,
        StudentIdStudent: +req.body.idStudent
    }).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Course create' });
    }).catch(error => {
        res.status(500).json({ status: 'Course create failed', message: 'Excellent, you have broken it' });
    });
};


exports.updateCourse = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    db.Course.update({
        name: req.body.name,
        professor: req.body.professor,
        credits: +req.body.credits,
    },
    {
        where: { idCourse: req.body.idCourse }
    }

    ).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Course update' });
    }).catch(error => {
        res.status(500).json({ status: 'Course update failed', message: 'Excellent, you have broken it' });
    });
};
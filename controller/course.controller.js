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
        name: req.body.name,
        professor: req.body.professor,
        credits: +req.body.credits,
        hours: +req.body.hours,
        semester: +req.body.semester,
        StudentIdStudent: +req.body.idStudent
    }).then(data => {
        res.status(201).json({ status: 'sucess', message: 'User create' });
    }).catch(error => {
        res.status(500).json({ status: 'fail', message: 'Uups algo fallo, verifique si el id esta bien ingresado' });
    });
};
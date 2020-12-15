const { validationResult } = require("express-validator");
const { sequelize } = require("../models");
const db = require("../models");

exports.saveStudent = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    db.Student.create({
        idStudent: +req.body.idStudent,
        name: req.body.name,
        age: +req.body.age,
        email: req.body.email,
    }).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Student create' });
    }).catch(error => {
        res.status(500).json({ status: 'Student create failed', message: 'Excellent, you have broken it' });
    });

};


exports.updateStudent = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    db.Student.update(
        {
            name: req.body.name,
            age: +req.body.age,
            email: req.body.email,
        },
        {
          where: { idStudent: req.body.idStudent }
        }
    ).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Student update' });
    }).catch(error => {
        res.status(500).json({ status: 'Student update failed', message: 'Excellent, you have broken it' });
    });


};

const { validationResult } = require("express-validator");
const { sequelize } = require("../models");
const db = require("../models");

exports.saveScore = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    db.Score.create({
        scoreOne: + req.body.scoreOne,
        scoreTwo: + req.body.scoreTwo,
        scoreTree: + req.body.scoreTree,
        scoreFour: + req.body.scoreFour,
        CourseIdCourse: req.body.idCourse
    }).then(data => {
        res.status(201).json({ status: 'sucess', message: 'User create' });

    }).catch(error => {
        res.status(500).json({ status: 'fail', message: 'Error!' });
    })
};
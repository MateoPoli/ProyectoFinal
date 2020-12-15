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

    const av = ((+req.body.scoreOne) + (+req.body.scoreTwo) + (+req.body.scoreTree) + (+req.body.scoreFour)) / 4;
    var st = "";
    if (av >= 3.0) st = "approved";
    else st = "reproved";

    db.Score.create({
        scoreOne: + req.body.scoreOne,
        scoreTwo: + req.body.scoreTwo,
        scoreTree: + req.body.scoreTree,
        scoreFour: + req.body.scoreFour,
        average: av,
        state: st,
        CourseIdCourse: req.body.idCourse
    }).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Score create' });

    }).catch(error => {
        res.status(500).json({ status: 'Score create failed', message: 'Excellent, you have broken it' });
    })
};


exports.updateScore = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 500;
        error.data = errors.array();
        throw error;
    }

    const av = ((+req.body.scoreOne) + (+req.body.scoreTwo) + (+req.body.scoreTree) + (+req.body.scoreFour)) / 4;
    var st = "";
    if (av >= 3.0) st = "approved";
    else st = "reproved";

    db.Score.update(
        {
            scoreOne: + req.body.scoreOne,
            scoreTwo: + req.body.scoreTwo,
            scoreTree: + req.body.scoreTree,
            scoreFour: + req.body.scoreFour,
            average: av,
            state: st,
        },
        {
            where: { CourseIdCourse: req.body.idCourse }
        }

    ).then(data => {
        res.status(201).json({ status: 'sucess', message: 'Score update' });

    }).catch(error => {
        res.status(500).json({ status: 'Score update failed', message: 'Excellent, you have broken it' });
    })
};
const { validationResult } = require('express-validator');

// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
 //2-middleware to catch error from fules
const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = validatorMiddleware;
/*
        (req, res) => {
    const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({result :result.array()});
        }
    } */
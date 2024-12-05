const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getCategoryValidator = [
    //1-rules
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
    /* param('id').isMongoId().withMessage("Error id"), */
];
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
// (1)11111111111111111111111111111111111111111111111- rules

exports.getCategoryValidator = [
    //1-rules
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
    /* param('id').isMongoId().withMessage("Error id"), */
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name')
        /* .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }) */,
    validatorMiddleware,//catch any error when accure error in the previous rules
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    /* body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }), */
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
];
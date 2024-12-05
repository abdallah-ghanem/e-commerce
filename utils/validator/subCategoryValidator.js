const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
// (1)11111111111111111111111111111111111111111111111- rules

exports.getSubCategoryValidator = [
    //1-rules
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 2 })
        .withMessage('Too short Subcategory name')
        .isLength({ max: 32 })
        .withMessage('Too long Subcategory name'),
    check('category')
        .notEmpty()
        .withMessage('Category required')
        .isMongoId()
        .withMessage("Invalid category id format"),//check in catigory first
    validatorMiddleware,//catch any error when accure error in the previous rules
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];
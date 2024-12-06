const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
// (1)11111111111111111111111111111111111111111111111- rules

exports.getBrandValidator = [
    //1-rules
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware,
];

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand required')
        .isLength({ min: 3 })
        .withMessage('Too short Brand name')
        .isLength({ max: 32 })
        .withMessage('Too long Brand name'),
    validatorMiddleware,//catch any error when accure error in the previous rules
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id format'),
    validatorMiddleware,
];
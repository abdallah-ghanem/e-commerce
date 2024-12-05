const express = require('express');
const { param, validationResult } = require('express-validator');//to make layer validation 
const router = express.Router();

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage,
} = require('../controllers/categoryService');

router.route('/').get(getCategories)
    .post(
        /* authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        createCategoryValidator, */
        createCategory
    );

router
    .route('/:id')//same name frm contrlloer
    .get(
        //1-rules
        param('id').isMongoId().withMessage("Error id"),
        //2-middleware to catch error from fules
        (req, res) => {
    const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({result :result.array()});
        }
    }, getCategory)//getCategoryValidator,
    .put(
        /* authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        updateCategoryValidator, */
        updateCategory
    )
    .delete(deleteCategory)

module.exports = router;
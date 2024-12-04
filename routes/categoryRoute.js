const express = require('express');

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
    .get( getCategory)//getCategoryValidator,
    /* .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    ) */

module.exports = router;
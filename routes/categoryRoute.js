const express = require('express');
const { param, validationResult } = require('express-validator');//to make layer validation 
const router = express.Router();
const {getCategoryValidator} = require("../utils/validator/categoryValidator");

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
    .get(getCategoryValidator, getCategory)// Before enter to controller getCategory enter first to validator getCategoryValidator 
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
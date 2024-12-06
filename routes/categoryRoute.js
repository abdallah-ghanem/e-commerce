/* eslint-disable import/newline-after-import */
const express = require('express');
const { param, validationResult } = require('express-validator');//to make layer validation 
const router = express.Router();
//take this functions from thiis foulder
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator,} = require("../utils/validator/categoryValidator");
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
        resizeImage,*/
        createCategoryValidator, //createCategoryValidator
        createCategory
    );

//nested Route
const subCategoryRoute = require("./subCategoryRoute");
router.use('/:categoryId/subcategories', subCategoryRoute);

router
    .route('/:id')//same name frm contrlloer
    .get(getCategoryValidator, getCategory)// Before enter to controller getCategory enter first to validator getCategoryValidator 
    .put(
        /* authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,*/
        updateCategoryValidator, 
        updateCategory
    )
    .delete(deleteCategoryValidator, deleteCategory)

module.exports = router;
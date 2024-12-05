/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator 
        } = require('../utils/validator/subCategoryValidator');
const { createSubCategory, getSubCategory, getSubCategories, updateSubCategory, deleteSubCategory 
        } = require('../controllers/subCategoryService');

router.route('/')
    .get(getSubCategories)
    .post(createSubCategoryValidator,createSubCategory)

router.route('/:id')
.get(getSubCategoryValidator, getSubCategory)
.put(updateSubCategoryValidator, updateSubCategory)
.delete(deleteSubCategoryValidator, deleteSubCategory)
module.exports = router;
/* eslint-disable import/newline-after-import */
const express = require('express');
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator
} = require('../utils/validator/subCategoryValidator');
const { createSubCategory, getSubCategory, getSubCategories, updateSubCategory, deleteSubCategory, setCategoryIdToBody, makeFilterObj, 
} = require('../controllers/subCategoryService');

// Nested Rout // mergeParams: Allow us to access parameters on ather routers
// EX we need to access categoryid from category routers
const router = express.Router({ mergeParams: true })

router.route('/')
        .get(makeFilterObj, getSubCategories)
        .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)

router.route('/:id')
        .get(getSubCategoryValidator, getSubCategory)
        .put(updateSubCategoryValidator, updateSubCategory)
        .delete(deleteSubCategoryValidator, deleteSubCategory)
module.exports = router;
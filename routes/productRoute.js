/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
//take this functions from thiis foulder
const {getProductValidator,createProductValidator,updateProductValidator,deleteProductValidator,} = require("../utils/validator/productValidator");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productService');

router.route('/').get(getProducts)
    .post(createProductValidator,createProduct);

router
    .route('/:id')//same name frm contrlloer
    .get(getProductValidator, getProduct)// Before enter to controller getCategory enter first to validator getCategoryValidator 
    .put(
        /* authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,*/
        updateProductValidator, 
        updateProduct
    )
    .delete(deleteProductValidator, deleteProduct)

module.exports = router;
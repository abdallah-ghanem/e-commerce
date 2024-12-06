/* eslint-disable import/newline-after-import */
const express = require('express');
const router = express.Router();
//take this functions from thiis foulder
const {getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,} = require("../utils/validator/brandValidator");
const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
} = require('../controllers/brandService');

router.route('/').get(getBrands).post(createBrandValidator,createBrand);
router
    .route('/:id')//same name frm contrlloer
    .get(getBrandValidator, getBrand)// Before enter to controller getCategory enter first to validator getCategoryValidator 
    .put(updateBrandValidator,updateBrand)
    .delete(deleteBrandValidator, deleteBrand)

module.exports = router;
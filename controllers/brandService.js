const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); //instead try catch and .then .catch
const ApiError = require("../utils/apiError");
const Brand = require("../models/brandMode");
//====================================================================================================
// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
    // page limit skip to show products in pages mini product in one page 5 products
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 6; // to make you enter the number or make defult number
    const skip = (page - 1) * limit; // (2-1) * 5 = 5       make skip for first 5 product and get the second 5 product
    const brands = await Brand.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: brands.length, page, data: brands }); //name result to count numbers of data at database
});
//====================================================================================================
// @desc    Get specific brands by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params; //make this separeted to pass to routes
    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({ data: brand });
});
//====================================================================================================
// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private/Admin-Manager
exports.createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;//get the name from all data in DB
    // async await
    const brand = await Brand.create({ name, slug: slugify(name) }); //slugify to convert space to -
    res.status(201).json({ data: brand });
});
//====================================================================================================
// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private/Admin-Manager
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    ); 
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({ data: brand });
});
//====================================================================================================
// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(204).send();
});
//====================================================================================================

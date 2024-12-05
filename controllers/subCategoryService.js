const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); //instead try catch and .then .catch
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");//model make uper case
//====================================================================================================
// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const {name , category } = req.body;
    // async await
    const subCategory = await SubCategory.create({ name, slug: slugify(name), category }); //slugify to convert space to -
    res.status(201).json({ data: subCategory });
});
//====================================================================================================
// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
    // page limit skip to show products in pages mini product in one page 5 products
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5; // to make you enter the number or make defult number
    const skip = (page - 1) * limit; // (2-1) * 5 = 5       make skip for first 5 product and get the second 5 product
    const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: subCategories.length, page, data: subCategories }); //name result to count numbers of data at database
});
//====================================================================================================
// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params; //make this separeted to pass to routes
    const subCategories = await SubCategory.findById(id);
    if (!subCategories) {
        return next(new ApiError(`No subcategory for this id ${id}`, 404));
    }
    res.status(200).json({ data: subCategories });
});
//====================================================================================================
// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private/Admin-Manager
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategory.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name), category },
        { new: true }
    ); //get product from id and edit name and slug
    if (!subCategory) {
        return next(new ApiError(`No subcategory for this id ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
});
//====================================================================================================
// @desc    Delete specific subcategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private/Admin
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
        return next(new ApiError(`No subcategory for this id ${id}`, 404));
    }
    res.status(204).send();
});
//====================================================================================================
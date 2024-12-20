const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); //instead try catch and .then .catch
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
//====================================================================================================
// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 6; // to make you enter the number or make defult number
    const skip = (page - 1) * limit; // (2-1) * 5 = 5       make skip for first 5 product and get the second 5 product
    const products = await Product.find({}).skip(skip).limit(limit).populate({path: "category", select: "name -_id"});
    res.status(200).json({ result: products.length, page, data: products }); //name result to count numbers of data at database
});
//====================================================================================================
// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params; //make this separeted to pass to routes
    const product = await Product.findById(id).populate({path: "category", select: "name -_id"});
    if (!product) {
        //res.status(404).json({ msg: `No category for this id ${id}` });
        return next(new ApiError(`No product for this id ${id}`, 404));
    }
    res.status(200).json({ data: product });
});
//====================================================================================================
// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private/Admin-Manager
exports.createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    //const {name} = req.body;
    const product = await Product.create(req.body); //slugify to convert space to -
    res.status(201).json({ data: product });
});
//====================================================================================================
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin-Manager
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if(req.body.title){
    req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    ); 
    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }
    res.status(200).json({ data: product });
});
//====================================================================================================
// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }
    res.status(204).send();
});
//====================================================================================================

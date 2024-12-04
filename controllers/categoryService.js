const CategoryModel = require('../models/catigoryModel');
const Category = require('../models/catigoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');//instead try catch and .then .catch
//const factory = require('./handlersFactory');
//====================================================================================================
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async(req, res) => {
    // page limit skip to show products in pages mini product in one page 5 products
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5; // to make you enter the number or make defult number
    const skip = (page - 1) * limit;// (2-1) * 5 = 5       make skip for first 5 product and get the second 5 product
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result:categories.length, page, data: categories});//name result to count numbers of data at database
});
//====================================================================================================
// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async(req, res) => {
    const { id } = req.params;//make this separeted to pass to routes
    const category = await CategoryModel.findById(id);
    if (!category) {
        res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category});
});
//====================================================================================================
// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private/Admin-Manager
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    // async await
    const category = await CategoryModel.create({ name, slug: slugify(name) });//slugify to convert space to -
    res.status(201).json({ data: category });

        /* .then((category) => {
            res.status(201).json({ data: category });
        })
        .catch((err) => {
            res.status(400).send(err);
        }); */

        /* console.log(req.body);
        const newCategory = new CategoryModel({ name }); //new = create
        newCategory.save()
        .then((doc) => {
        res.json(doc);
        })
        .catch((err) => {
        res.json(err);
        }); */
});

//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================
//====================================================================================================

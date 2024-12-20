const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        minlength: [3, "Product title should be at least 3 characters long"],
        maxlength: [200, "Product title should not be more than 200 characters long"],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [10, "Product description should be at least 10 characters long"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quality is required"],
    },
    slod: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        max: [200000, "Product price is high $0"],
    },
    priceAfterDiscount: {
        type: Number,
    },
    availableColor: {
        type: String,
        enum: ["red", "blue", "green", "yellow", "black", "white"],
    },
    imageCover: {
        type: [String],
        required: [true, "Product images are required"],
    },
    images: [String],
    category: {//must product ينتمي الي one of امواع that i created
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must belong to a category"],
    },
    subCategories: {//must product ينتمي الي قسم ما يحتوي علي الف��ات
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
        /* required: [true, "Product must belong to a subcategory"], */
    },
    brand: {//must product ينتمي الي شريحة التي يحتوي علي الماركات
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
    ratingAvarage: {
        type: Number,
        min: [1, "Rating should not be less than 1"],
        max: [5, "Rating should not be more than 5"],
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
},{ timestamps: true })
module.exports = mongoose.model("Product", ProductSchema)
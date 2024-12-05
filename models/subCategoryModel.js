const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,//add word to DB without spaces before or after words
            unique: [true, 'SubCategory must be unique'],
            minlength: [2, 'To short SubCategory name'],
            maxlength: [32, 'To long SubCategory name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {//demond to the main schema of catigory thet i made previous
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'SubCategory must be belong to parent category'],
        },
    },{ timestamps: true });

    // 2- Create model
module.exports = mongoose.model('SubCategory', subCategorySchema);
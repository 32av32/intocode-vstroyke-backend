const mongoose = require('mongoose')
const Reviews = require('../models/Review.model')
const Questions = require('../models/Question.model')
const Favorites = require('../models/Favorite.model')
const Schema = mongoose.Schema
const { modelToJson } = require("../utils");
const AdSchema = new Schema({
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        // required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    address: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    unit: {
        type: String,
        // required: true,
        enum: ['шт.', 'кв.м.', 'куб.м.',],
    },
    rating: {
        type: Number,
        default: 0,
    },
})

AdSchema.methods.toJSON = modelToJson

AdSchema.post('findOneAndDelete', async function(doc, next) {
    await Reviews.deleteMany({ad: doc._id})
    await Questions.deleteMany({ad: doc._id})
    await Favorites.deleteMany({ad: doc._id})
    next();
});

module.exports = mongoose.model('Ad', AdSchema)
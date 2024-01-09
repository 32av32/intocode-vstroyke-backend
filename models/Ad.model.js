const mongoose = require('mongoose')
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
        range: {
            min: { type: Number, min: 1 },
            max: { type: Number, max: 5 }
        },
        default: 0,
    }
})

AdSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Ad', AdSchema)
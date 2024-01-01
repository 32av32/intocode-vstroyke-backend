const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const ReviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ad: {
        type: Schema.Types.ObjectId,
        ref: 'Ad',
        required: true,
    },
    rating: {
        type: Number,
        range: {
            min: { type: Number, min: 1 },
            max: { type: Number, max: 5 }
        }
    },
    qualityMark: {
        type: String,
        enum : ['Низкое', 'Среднее', 'Высокое', 'Отличное'],
    },
    speedMark: {
        type: String,
        enum : ['Низкое', 'Среднее', 'Высокое', 'Отличное'],
    },
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
})

ReviewSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Review', ReviewSchema)
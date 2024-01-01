const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

CategorySchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Category', CategorySchema)
const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const QuestionSchema = new Schema({
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
    answer: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Fulfilled', 'Rejected']
    }
})

QuestionSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Question', QuestionSchema)
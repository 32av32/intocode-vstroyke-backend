const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const OrderSchema = new Schema({
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

OrderSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Order', OrderSchema)
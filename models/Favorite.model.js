const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const FavoriteSchema = new Schema({
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
})

FavoriteSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Favorite', FavoriteSchema)
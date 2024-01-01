const mongoose = require('mongoose')
const {modelToJson} = require("../utils");
const Schema = mongoose.Schema
const ChatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages : [
        {
            message : String,
            meta : [
                {
                    user : {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'User'
                    },
                    createdDate: {
                        type: Date,
                        default: Date.now,
                        immutable: true,
                    },
                    delivered : Boolean,
                    read : Boolean
                }
            ]
        }
    ],
})

ChatSchema.methods.toJSON = modelToJson

module.exports = mongoose.model('Chat', ChatSchema)
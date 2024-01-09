const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        // match: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    organization: {
        type: String,
        enum : ['Частное лицо', 'Юридическое лицо'],
        default: 'Частное лицо',
    },
    createdDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    role: {
        type: String,
        enum : ['user','admin', 'moderator'],
        default: 'user'
    },
    phone: {
        type: String,
        // validate: [
        //     {
        //         validator: function (v) {
        //             return v === '' || v.match('^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$')
        //         },
        //         message: 'Не соответствует шаблону'
        //     }
        // ]
        // match: '^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$',
    },
    image: {
        type: String,
    }
})

// UserSchema.methods.toJSON = modelToJson.bind(UserSchema, 'password')
UserSchema.methods.toJSON = function (...args) {
    const modelObject = this.toObject();
    delete modelObject.__v;
    delete modelObject.password;
    return modelObject;
}

module.exports = mongoose.model('User', UserSchema)
const Users = require('../models/User.model')
const {deleteImage} = require("../utils");

module.exports.usersController = {
    getUsers: async function (req, res) {
        try {
            const users = await Users.find()
            res.json(users)
        } catch (err) {
            res.status(400).json({error: 'Не удалось получить записи'})
        }
    },
    getUser: async function (req, res) {
        try {
            const user = await Users.findById(req.userId)
            res.json(user)
        } catch (err) {
            res.status(400).json({error: 'Не удалось получить пользователя', message: err.message})
        }
    },
    deleteUser: async function (req, res) {
        try {
            const user = await Users.findById(req.params.id)
            await Users.findByIdAndDelete(req.params.id)
            user.image && await deleteImage(user.image, 'profile')
            res.json('Пользователь удален')
        } catch (err) {
            res.status(400).json({error: 'Ошибка при удалении пользователя'})
        }
    },
    patchUser: async function (req, res) {
        try {
            const { name, organization, phone } = req.body
            await Users.findByIdAndUpdate(req.userId, { name, organization, phone })
            const user = await Users.findById(req.userId)
            if (req.imageName) {
                user.image && await deleteImage(user.image, 'profile')
                user.image = req.imageName
                await user.save()
            }
            res.json(user)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при изменении пользователя', message: err.message})
        }
    },
    getProfile: async function (req, res) {
        try {
            const user = await Users.findById(req.params.id).select('_id name image organization createdDate')
            res.json(user)
        } catch (err) {
            res.status(400).json({error: 'Не удалось получить пользователя', message: err.message})
        }
    }
}
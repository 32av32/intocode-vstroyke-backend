const Users = require('../models/User.model')

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
            await Users.findByIdAndDelete(req.params.id)
            res.json('Пользователь удален')
        } catch (err) {
            res.status(400).json({error: 'Ошибка при удалении пользователя'})
        }
    },
    patchUser: async function (req, res) {
        try {
            // let user = await Users.findById(req.userId)
            //
            // if (user._id.toString() !== req.userId && req.userRole !== 'admin') {
            //     return res.status(403).json({error: 'У вас не прав на изменение данных'})
            // }
            const { name, organization, phone } = req.body
            await Users.findByIdAndUpdate(req.params.id, { name, organization, phone })
            const user = await Users.findById(req.userId)
            if (req.imageName) {
                user.image = req.imageName
                await user.save()
            }
            res.json(user)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при изменении пользователя', message: err.message})
        }
    }
}
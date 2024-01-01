const Users = require('../models/User.model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


module.exports.authController = {
    signin: async function (req, res) {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (user) {
                const valid = await bcrypt.compare(password, user.password)
                if (valid) {
                    const payload = {
                        id: user._id,
                        role: user.role
                    }
                    const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
                    return res.json(token)
                }
            }
            return res.status(401).json({error: 'Неверные данные учетной записи'})
        } catch (err) {
            res.status(400).json({error: 'Ошибка при авторизации'})
        }
    },
    signup: async function (req, res) {
        try {
            const { email, password } = req.body
            if (email && password) {
                const hashPassword = await bcrypt.hash(password, Number(process.env.SALT))
                const user = await Users.create({ email, password: hashPassword })
                return res.json(user)
            }
            res.status(400).json({error: 'Отсутствуют email/пароль'})
        } catch (err) {
            res.status(400).json({error: 'Ошибка при регистрации пользователя'})
        }
    },
}
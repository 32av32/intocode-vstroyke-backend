const Ads = require('../models/Ad.model')
const Orders = require("../models/Order.model");

module.exports.ordersController = {
    getOrder: async function (req, res) {
        try {
            const order = await Orders.findOne({ad: req.params.adId, user: req.userId})
            return res.json(order)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить запись", message: err.message})
        }
    },
    getOrders: async function (req, res) {
        try {
            const orders = await Orders.find({user: req.userId}).populate('ad', '-__v')
            return res.json(orders)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить запись", message: err.message})
        }
    },
    postOrder: async function(req, res) {
        try {
            const order = await Orders.create({ ...req.body, user: req.userId })
            res.json(order)
        } catch (err) {
            res.status(400).json({error: "Ошибка при добавлении записи", message: err.message})
        }
    },
    deleteOrder: async function (req, res) {
        try {
            const order = await Orders.findByIdAndDelete(req.params.id)
            return res.json(order)
        } catch (err) {
            res.status(400).json({error: "Не удалось удалить запись", message: err.message})
        }
    },
    // patchOrder: async function(req, res) {
    //     try {
    //         await Orders.findByIdAndUpdate(req.params.id, { ...req.body })
    //         // Без этого кода выдает старый результат
    //         const ad = await Ads.findById(req.params.id)
    //         res.json(ad)
    //     } catch (err) {
    //         res.status(400).json({error: "Ошибка при изменении записи", message: err.message})
    //     }
    // },
}
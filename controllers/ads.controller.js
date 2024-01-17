const Ads = require('../models/Ad.model')
const Favorites = require("../models/Favorite.model");
const Orders = require("../models/Order.model");
const {deleteImage} = require("../utils");

module.exports.adsController = {
    getAd: async function(req, res) {
        try {
            const ad = await Ads.findById(req.params.id).populate('user', '-password -role -__v')
            if (req.userId) {
                const favorite = await Favorites.findOne({ad: ad._id, user: req.userId})
                const order = await Orders.findOne({ad: ad._id, user: req.userId})
                return res.json({...ad.toObject(), favorite: favorite?._id, orderStatus: order?.status})
            }
            return res.json(ad)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить запись", message: err.message})
        }
    },
    getAds: async function(req, res) {
        try {
            const ads = await Ads.find()
            res.json(ads)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить записи"})
        }
    },
    getUserAds: async function(req, res) {
        try {
            const ads = await Ads.find({user: req.userId})
            res.json(ads)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить записи", message: err.message})
        }
    },
    postAd: async function(req, res) {
        try {
            const ad = await Ads.create({ ...req.body, user: req.userId })
            if (req.imageName) {
                ad.images.push(...req.imageName)
                await ad.save()
            }
            res.json(ad)
        } catch (err) {
            res.status(400).json({error: "Ошибка при добавлении записи", message: err.message})
        }
    },
    deleteAd: async function(req, res) {
        try {
            const ad = await Ads.findById(req.params.id)

            if (ad.user.toString() !== req.userId && (req.userRole !== 'admin' || req.userRole !== 'moderator')) {
                return res.status(403).json({error: 'У вас не прав на изменение данных'})
            }
            await Ads.findByIdAndDelete(req.params.id)
            for (let image of ad.images) {
                await deleteImage(image, 'pictures')
            }

            res.json(ad._id)
        } catch (err) {
            res.status(400).json({error: "Ошибка при удалении записи", message: err.message})
        }
    },
    patchAd: async function(req, res) {
        try {
            await Ads.findByIdAndUpdate(req.params.id, { ...req.body })
            // Без этого кода выдает старый результат
            const ad = await Ads.findById(req.params.id)
            res.json(ad)
        } catch (err) {
            res.status(400).json({error: "Ошибка при изменении записи", message: err.message})
        }
    },
}
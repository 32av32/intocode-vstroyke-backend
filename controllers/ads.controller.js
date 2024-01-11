const Ads = require('../models/Ad.model')
const Favorites = require("../models/Favorite.model");

module.exports.adsController = {
    getAd: async function(req, res) {
        try {
            const ad = await Ads.findById(req.params.id).populate('user', '-password -role -__v')
            if (req.userId) {
                const favorite = await Favorites.findOne({ad: ad._id, user: req.userId})
                return res.json({...ad.toObject(), favorite: favorite?._id})
            }
            return res.json(ad)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить запись", message: err.message})
        }
    },
    getAds: async function(req, res) {
        try {
            const ads = await Ads.find().select('-user -description -address')
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
            res.json('Record has been deleted')
        } catch (err) {
            res.status(400).json({error: "Ошибка при удалении записи", message: err.message})
        }
    },
    patchAd: async function(req, res) {
        try {
            const ad = await Ads.findByIdAndUpdate(req.params.id, { ...req.body })
            res.json(ad)
        } catch (err) {
            res.status(400).json({error: "Ошибка при изменении записи"})
        }
    },
}
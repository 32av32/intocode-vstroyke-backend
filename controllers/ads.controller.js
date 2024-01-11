const Ads = require('../models/Ad.model')
// const Users = require('../models/User.model')

module.exports.adsController = {
    getAd: async function(req, res) {
        try {
            const ad = await Ads.findById(req.params.id).populate('user', '-password -role -__v')
            res.json(ad)
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
            // await ad.remove().exec()
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
    // postFavorite: async function(req, res) {
    //     try {
    //         const user = await Users.findById(req.userId)
    //         const ad = await Ads.findByIdAndUpdate(req.params.id)
    //         ad.favorites.push(user)
    //         await ad.save()
    //         res.json(ad)
    //     } catch (err) {
    //         res.status(400).json({error: 'Ошибка при добавлении записи'})
    //     }
    // },
    // deleteFavorite: async function (req, res) {
    //     try {
    //         const ad = await Ads.findById(req.params.id)
    //         ad.favorites = ad.favorites.filter(item => item !== req.params.userId)
    //         res.json('Запись удалена')
    //     } catch (err) {
    //         res.status(400).json({error: 'Ошибка при удалении записи'})
    //     }
    // },
}
const Favorites = require('../models/Favorite.model')
const Ads = require('../models/Ad.model')

module.exports.favoritesController = {
    postFavorite: async function(req, res) {
        try {
            const favorite = await Favorites.create({ad: req.body.ad, user: req.userId })
            const ad = await Ads.findById(req.body.ad)
            res.json({...ad.toObject(), favorite: favorite._id})
        } catch (err) {
            res.status(400).json({error: 'Ошибка при добавлении записи'})
        }
    },
    deleteFavorite: async function (req, res) {
        try {
            // const favorite = await Favorites.findById(req.params.id)
            const favorite = await Favorites.findOne({ad: req.params.id, user: req.userId})
            await Favorites.findByIdAndDelete(favorite._id)
            const ad = await Ads.findById(favorite.ad)
            res.json({...ad.toObject(), favorite: undefined})
        } catch (err) {
            res.status(400).json({error: 'Ошибка при удалении записи'})
        }
    },
    getUserFavorites: async function(req, res) {
        try {
            const favorites = await Favorites.find({user: req.userId})
            const ads = await Ads.find({'user': { $in: favorites.map(favorite => favorite.user) }})
            res.json(ads)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при добавлении записи'})
        }
    }
}
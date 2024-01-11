const Favorites = require('../models/Favorite.model')

module.exports.favoritesController = {
    postFavorite: async function(req, res) {
        try {
            const favorite = await Favorites.create({ ...req.body, user: req.userId })
            res.json(favorite)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при добавлении записи'})
        }
    },
    deleteFavorite: async function (req, res) {
        try {
            await Favorites.findByIdAndDelete(req.params.id)
            res.json('Запись удален')
        } catch (err) {
            res.status(400).json({error: 'Ошибка при удалении записи'})
        }
    },
}
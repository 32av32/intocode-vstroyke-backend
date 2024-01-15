const { Router } = require('express')
const { favoritesController } = require('../controllers/favorites.controller')
const { authMiddleware } = require("../middlewares/auth.middleware");
const router = Router()

router.post('', authMiddleware, favoritesController.postFavorite)
router.get('', authMiddleware, favoritesController.getUserFavorites)
router.delete('/:adId', authMiddleware, favoritesController.deleteFavorite)

module.exports = router;
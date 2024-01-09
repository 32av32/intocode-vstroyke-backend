const { Router } = require('express')
const { adsController } = require('../controllers/ads.controller')
const {authMiddleware} = require("../middlewares/auth.middleware");
const {adminMiddleware} = require("../middlewares/admin.middleware");
const uploadImageMiddleware = require("../middlewares/uploadImage.middleware");
const router = Router()


router.get('', adsController.getAds)
router.get('/:id', adsController.getAd)
router.get('/:user/ads', authMiddleware, adsController.getUserAds)
router.post('', uploadImageMiddleware.array('images', 10), authMiddleware, adsController.postAd)
router.delete('/:id', authMiddleware, adsController.deleteAd)
router.patch('/:id', authMiddleware, adsController.patchAd)

module.exports = router;
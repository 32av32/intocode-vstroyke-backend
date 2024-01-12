const { Router } = require('express')
const { reviewsController } = require('../controllers/reviews.controller')
const {authMiddleware} = require("../middlewares/auth.middleware");
const router = Router()


router.get('/:adId', reviewsController.getReviews)
router.get('/:id', reviewsController.getReview)
router.get('/user/reviews', authMiddleware, reviewsController.getUserReview)
router.post('', authMiddleware, reviewsController.postReview)
router.delete('/:id', authMiddleware, reviewsController.deleteReview)
router.patch('/:id', authMiddleware, reviewsController.patchReview)

module.exports = router;
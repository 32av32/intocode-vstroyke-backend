const Reviews = require('../models/Review.model')
const Ads = require('../models/Ad.model')


module.exports.reviewsController = {
    getReview: async function(req, res) {
        try {
            const review = await Reviews.findById(req.params.id)
            res.json(review)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить запись"})
        }
    },
    getReviews: async function(req, res) {
        try {
            const reviews = await Reviews.find({ad: req.params.adId}).populate('user', 'name image')
            res.json(reviews)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить записи"})
        }
    },
    getUserReview: async function(req, res) {
        try {
            const reviews = await Reviews.find({user: req.userId})
            res.json(reviews)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить записи"})
        }
    },
    postReview: async function(req, res) {
        try {
            const review = await Reviews.create({ ...req.body, user: req.userId })
            const adReviews = await Reviews.aggregate(   [
                {$match: { ad: review.ad }},
                {$group: {
                            _id: "$ad",
                            avgRating: { $avg: "$rating" }
                        }}
            ])
            await Ads.findByIdAndUpdate(review.ad, {rating: adReviews[0].avgRating.toFixed(1)})
            res.json(review)
        } catch (err) {
            res.status(400).json({error: "Ошибка при добавлении записи", message: err.message})
        }
    },
    deleteReview: async function(req, res) {
        try {
            const review = await Reviews.findById(req.params.id)
            if (review.user.toString() !== req.userId && (req.userRole !== 'admin' || req.userRole !== 'moderator')) {
                return res.status(403).json({error: 'У вас не прав на изменение данных'})
            }
            await Reviews.findByIdAndDelete(req.params.id)
            res.json('Record has been deleted')
        } catch (err) {
            res.status(400).json({error: "Ошибка при удалении записи", message: err.message})
        }
    },
    patchReview: async function(req, res) {
        try {
            const review = await Reviews.findByIdAndUpdate(req.params.id, { ...req.body })
            const adReviews = await Reviews.aggregate(   [
                {$match: { ad: review.ad }},
                {$group: {
                        _id: "$ad",
                        avgRating: { $avg: "$rating" }
                    }}
            ])
            await Ads.findByIdAndUpdate(review.ad, {rating: adReviews[0].avgRating.toFixed(1)})
            res.json(review)
        } catch (err) {
            res.status(400).json({error: "Ошибка при изменении записи"})
        }
    }
}
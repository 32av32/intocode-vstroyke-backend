const { Router } = require('express')
const { questionsController } = require('../controllers/questions.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

const router = Router()


router.get('/:adId', questionsController.getQuestions)
router.patch('/:id', authMiddleware, questionsController.patchQuestion)
router.post('', authMiddleware, questionsController.postQuestions)


module.exports = router
const QuestionModel = require("../models/Question.model")



module.exports.questionsController = {
    getQuestions: async function(req, res) {
        try {
            const question = await QuestionModel.find({ad: req.params.adId}).populate('user', '_id name')
            res.json(question)
        } catch (err) {
            res.status(400).json({error: "Не удалось получить записи"})
        }
    },
    postQuestions: async function(req, res) {
        try {
            const addQuestion = await QuestionModel.create({ ...req.body, user: req.userId })
            res.json(addQuestion)
        } catch (err) {
            res.status(400).json({error: "Ошибка при добавлении записи", message: err.message})
        }
    },
    patchQuestion: async function(req, res) {
        try {
            const addQuestion = await QuestionModel.findByIdAndUpdate(req.params.id, { ...req.body}, {new: true})
            res.json(addQuestion)
        } catch (err) {
            res.status(400).json({error: "Ошибка при добавлении записи", message: err.message})
        }
    },
}
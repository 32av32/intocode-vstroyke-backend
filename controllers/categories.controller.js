const Categories = require('../models/Category.model')

module.exports.categoriesController = {
    getCategories: async function (req, res) {
        try {
            const categories = await Categories.find()
            res.json(categories)
        } catch (err) {
            res.status(400).json({error: 'Не удалось получить записи'})
        }
    },
    postCategory: async function(req, res) {
        try {
            const category = await Categories.create({ ...req.body })
            res.json(category)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при добавлении записи'})
        }
    },
    deleteCategory: async function (req, res) {
        try {
            await Categories.findByIdAndDelete(req.params.id)
            res.json('Запись удален')
        } catch (err) {
            res.status(400).json({error: 'Ошибка при удалении записи'})
        }
    },
    patchCategory: async function (req, res) {
        try {
            const category = await Categories.findByIdAndUpdate(req.params.id, { ...req.body })
            res.json(category)
        } catch (err) {
            res.status(400).json({error: 'Ошибка при изменении записи'})
        }
    }
}
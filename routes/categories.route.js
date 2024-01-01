const { Router } = require('express')
const { categoriesController } = require('../controllers/categories.controller')
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const uploadImageMiddleware = require("../middlewares/uploadImage.middleware");
const router = Router()

router.get('', categoriesController.getCategories)
router.post('', authMiddleware, adminMiddleware, categoriesController.postCategory)
router.delete('/:id', authMiddleware, adminMiddleware, categoriesController.deleteCategory)
router.patch('/:id', uploadImageMiddleware.single('image'), authMiddleware, adminMiddleware, categoriesController.patchCategory)

module.exports = router;
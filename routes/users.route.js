const { Router } = require('express')
const { usersController } = require('../controllers/users.controller')
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const uploadImageMiddleware = require("../middlewares/uploadProfileImage.middleware");
const router = Router()

router.get('', authMiddleware, adminMiddleware, usersController.getUsers)
router.get('/:id', usersController.getUser)
router.delete('/:id', authMiddleware, adminMiddleware, usersController.deleteUser)
router.patch('/:id', uploadImageMiddleware.single('image'), authMiddleware, usersController.patchUser)

module.exports = router;
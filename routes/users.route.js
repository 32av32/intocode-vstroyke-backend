const { Router } = require('express')
const { usersController } = require('../controllers/users.controller')
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");
const uploadProfileImage = require("../middlewares/uploadProfileImage.middleware");
const router = Router()

router.get('', authMiddleware, adminMiddleware, usersController.getUsers)
router.get('/account', authMiddleware, usersController.getUser)
router.get('/:id', authMiddleware, usersController.getProfile)
router.delete('/:id', authMiddleware, adminMiddleware, usersController.deleteUser)
router.patch('/account', uploadProfileImage.single('image'), authMiddleware, usersController.patchUser)

module.exports = router;
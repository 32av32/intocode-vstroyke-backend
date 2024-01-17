const { Router } = require('express')
const { ordersController } = require('../controllers/orders.controller')
const {authMiddleware} = require("../middlewares/auth.middleware");
const {adminMiddleware} = require("../middlewares/admin.middleware");
const {optionalAuthMiddleware} = require("../middlewares/optionalAuth.middleware");
const router = Router()


router.get('', authMiddleware, ordersController.getOrders)
router.get('/:adId', authMiddleware, ordersController.getOrder)
router.post('', authMiddleware, ordersController.postOrder)
// router.delete('/:id', authMiddleware, ordersController.delete)
// router.patch('/:id', authMiddleware, ordersController.patchOrder)

module.exports = router;
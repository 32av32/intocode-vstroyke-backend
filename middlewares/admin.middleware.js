const Users = require('../models/User.model')


module.exports.adminMiddleware = async (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({error: 'У вас не прав админа'})
    }
    next()
}
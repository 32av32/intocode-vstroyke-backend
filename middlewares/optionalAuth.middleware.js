const jwt = require('jsonwebtoken')


module.exports.optionalAuthMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return next()
    }
    const [tokenType, token] = authorization.split(' ')
    if (tokenType !== 'Bearer') {
        return res.status(401).json({error: 'Тип токена должен быть Bearer'})
    }

    try {
        const complete = await jwt.verify(token, process.env.SECRET_KEY)
        req.userId = complete.id
        req.userRole = complete.role
        next()
    } catch (e) {
        return res.status(401).json({error: 'Неверный токен'})
    }
}
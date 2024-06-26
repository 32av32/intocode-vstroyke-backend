require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('public'));
app.use('/auth', require('./routes/auth.route'))
app.use('/users', require('./routes/users.route'))
app.use('/categories', require('./routes/categories.route'))
app.use('/ads', require('./routes/ads.route'))
app.use('/reviews', require('./routes/reviews.route'))
app.use('/favorites', require('./routes/favorites.route'))
app.use('/orders', require('./routes/orders.route'))
app.use('/questions', require('./routes/questions.route'))

async function connectToMongoose(url) {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Успешно соединились с сервером MongoDB')
    } catch (err) {
        console.log(`Ошибка при соединении с сервером MongoDB. Message: ${err.message}`)
    }

}

connectToMongoose(process.env.MONGOOSE_URL)
app.listen(process.env.MONGOOSE_PORT)
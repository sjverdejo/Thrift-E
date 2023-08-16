const config = require('./utils/config')
const express = require('express')
const session = require('express-session')
const app = express()
const usersRouter = require('./controllers/users')
const itemsRouter = require('./controllers/items')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected.')
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })

app.use(express.json())

app.use(
  session({
    secret: 'some secret',
    cookie: { maxAge : 30000 },
    saveUninitialized: false,
  })
)

app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/login', loginRouter)

module.exports = app
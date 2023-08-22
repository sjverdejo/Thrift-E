const config = require('./utils/config')
const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const usersRouter = require('./controllers/users')
const itemsRouter = require('./controllers/items')
const transactionRouter = require('./controllers/transactions')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')

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
app.use(fileUpload())
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))
app.use(
  session({
    secret: config.SECRET,
    cookie: { maxAge : 30000 },
    saveUninitialized: false,
    resave: false
  })
)

app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/login', loginRouter)
app.use('/api/buy', transactionRouter)
app.use('/api/logout', logoutRouter)

module.exports = app
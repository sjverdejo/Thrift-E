const config = require('./utils/config')
const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const itemsRouter = require('./controllers/items')
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
app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)

module.exports = app
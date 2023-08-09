const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  cost: String,
  user: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
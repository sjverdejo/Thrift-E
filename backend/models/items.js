const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    required: true
  },
  price: {
    type: String, //change to number
    required: true
  },
  clothingType: {
    type: String,
    required: true
  },
  //eventually add images

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
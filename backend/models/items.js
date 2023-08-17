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
    type: Number,
    required: true
  },
  clothingType: {
    type: String,
    required: true
  },
  //eventually add images

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isSold: {
    type: Boolean,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
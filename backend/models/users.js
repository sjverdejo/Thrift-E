const mongoose = require('mongoose')

//Model Schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'items'
    }
  ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
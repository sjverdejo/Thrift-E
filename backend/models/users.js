const mongoose = require('mongoose')

//Model Schema for User
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'items'
    }
  ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
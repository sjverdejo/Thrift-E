const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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

userSchema.plugin(uniqueValidator) //add plugin to make username unique

const User = mongoose.model('User', userSchema)

module.exports = User
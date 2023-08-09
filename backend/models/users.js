const mongoose = require('mongoose')

//Model Schema for User
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
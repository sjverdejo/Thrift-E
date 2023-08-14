const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  //User in database with matching username 
  const user = await User.findOne({ username })

  //check if password is valid only if user exists
  const validPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  //if invalid set status accordingly and send 401
  if (!(user && validPassword)) {
    console.log('Invalid login.')
    return res.status(401).json({
      status: 'invalid'
    })
  }

  //if valid send 200 status and set validity
  res
    .status(200)
    .json({status: 'valid'})
  
  console.log('Valid login')
})

module.exports = loginRouter
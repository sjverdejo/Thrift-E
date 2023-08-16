const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

//CREATE COMMENTS FOR THIS ONE
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!req.session.authenticated) {
    if (username && password) { 
      const user = await User.findOne({ username })
      const validPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
      if (user && validPassword) {
        req.session.authenticated = true
        req.session.user = user._id
        console.log(req.session.user)
        res.json({ message: 'Valid login.' })
      } else {
        res.status(401).json({ message: 'Invalid login.' })
      }
    } else {
      res.status(401).json({ message: 'Invalid login.' })
    }
  } else {
    res.status(404).json({ message: "Signed in already." })
  }
  
  //User in database with matching username 
  // const user = await User.findOne({ username })

  //check if password is valid only if user exists
  // const validPassword = user === null
  //   ? false
  //   : await bcrypt.compare(password, user.passwordHash)
   
  //if invalid set status accordingly and send 401
  // if (!(user && validPassword)) {
  //   console.log('Invalid login.')
  //   return res.status(401).json({
  //     status: 'invalid'
  //   })
  // }

  //if valid send 200 status and set validity
  // res
  //   .status(200)
  //   .json({status: 'valid'})
  
  // console.log('Valid login')
})

module.exports = loginRouter
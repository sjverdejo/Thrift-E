const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

//POST Route
//Logging into the application
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!req.session.authenticated) { //if not already authenticated
    if (username && password) { //if username and password exists
      const user = await User.findOne({ username }) //find the user with matching username in database
      const validPassword = user === null //if user exists, compare password to req.body password
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
      if (user && validPassword) { //authenticate session if valid and set user to id of user
        req.session.authenticated = true
        req.session.user = user._id
        res.status(200).json({ message: 'Valid login.' })
      } else {
        res.status(401).json({ message: 'Invalid login.' })
      }
    } else {
      res.status(401).json({ message: 'Invalid login.' })
    }
  } else {
    res.status(404).json({ message: "Signed in already." })
  }
})

module.exports = loginRouter
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
})

module.exports = loginRouter
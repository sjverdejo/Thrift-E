const logoutRouter = require('express').Router()

logoutRouter.delete('/', async (req, res) => {
  if (req.session.authenticated) {
    req.session.destroy((error) => {
      if (error) {
        console.log('Error logging out.')
        res.json({ message: 'Error logging out.' })
      } else {
        res.json({ message: 'Logout Successful.'})
      }
    })
  } else {
    res.status(401).json({ message: 'Not Logged In.'})
  }
})

module.exports = logoutRouter
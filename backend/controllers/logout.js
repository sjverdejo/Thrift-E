const logoutRouter = require('express').Router()

//POST Route
//Logging out of the system
logoutRouter.delete('/', async (req, res) => {
  if (req.session.authenticated) { //if authenticated, destroy session
    req.session.destroy((error) => {
      if (error) { //if error encountered send 401 status code
        console.log('Error logging out.')
        res.status(401).json({ message: 'Error logging out.' })
      } else {
        res.status(200).json({ message: 'Logout Successful.'})
      }
    })
  } else {
    res.status(401).json({ message: 'Not Logged In.'})
  }
})

module.exports = logoutRouter
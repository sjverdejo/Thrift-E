const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

//Just for testing
usersRouter.get('/', async (req, res) => {
  if (req.session.authenticated) {
    const users = await User.find({}).populate({path: 'items'})

    res.json(users)
  } else {
    res.json({message:'Cant do it boss'})
  }
})

//POST route to create a new user
//Create a new user, does not need authentication
usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const dateCreated = new Date() //set date to current date

  if (password === '') { //if password does not exist send 404 status
    console.log('Failed to create user due to no password.')
    res.status(404).json({ message: 'Failed to create due to invalid password.' })
    return
  }

  //secure password with bcrypt
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    dateCreated
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
    console.log('Successfully added user.')
  } catch (error) {
    console.log('Failed to create user due to no username/non unique.')
    res.status(404).json({ message: 'Failed to create due to invalid username.' })
  }
})

//GET route to retrieve specific user
//Return user with username
usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  if (req.session.authenticated) { //ensure authenticated
    const user = await User.findById(id)

    if (user) { //if user exists return
      console.log('Successfully retrieved.')
      res.json(user)
    } else {
      console.log('Failed to retrieve.')
      res.status(404).json({ message: 'Failed to retrieve.' })
    }
  } else {
    res.status(401).json({ message: 'Not Authenticated.'})
  }
})

module.exports = usersRouter
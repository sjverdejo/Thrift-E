const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

//POST route to create a new user
usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (password === '') {
    console.log('Failed to create user due to no password.')
    res.status(404).end()

  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
    console.log('Successfully added user.')
  } catch (error) {
    console.log('Failed to create user due to no username.')
    res.status(404).end()
  }
})

//GET route to retrieve specific user
usersRouter.get('/:username', async (req, res) => {
  const username = req.params.username

  const user = await User.findOne({ username: username })

  if (user) {
    console.log('Successfully retrieved.')
    res.json(user)
  } else {
    console.log('Failed to retrieve.')
    res.status(404).end()
  }
})

module.exports = usersRouter